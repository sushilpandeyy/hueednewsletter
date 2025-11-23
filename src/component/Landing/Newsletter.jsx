import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect, useState, useRef } from "react";

const Newsletter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  const firebaseAppRef = useRef(null);
  const firebaseHelpersRef = useRef({
    db: null,
    addDoc: null,
    collection: null,
    serverTimestamp: null,
  });
  const mailchimpIframeRef = useRef(null);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const newsletterCollection =
    import.meta.env.VITE_FIREBASE_NEWSLETTER_COLLECTION ||
    "newsletter_signups";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const hasFirebaseConfig = () =>
    Boolean(
      firebaseConfig.apiKey &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId &&
        firebaseConfig.appId
    );

  const loadFirebase = async () => {
    if (firebaseHelpersRef.current.db) {
      return firebaseHelpersRef.current;
    }

    if (!hasFirebaseConfig()) {
      console.warn(
        "[Newsletter] Firebase config missing; skipping Firestore submission"
      );
      return null;
    }

    try {
      const [{ initializeApp, getApps }, firestoreModule] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"),
        import(
          "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
        ),
      ]);

      // Check if Firebase app is already initialized
      let app;
      if (!firebaseAppRef.current) {
        const apps = getApps();
        if (apps.length > 0) {
          app = apps[0];
        } else {
          app = initializeApp(firebaseConfig);
        }
        firebaseAppRef.current = app;
      } else {
        app = firebaseAppRef.current;
      }

      const db = firestoreModule.getFirestore(app);

      firebaseHelpersRef.current = {
        db,
        addDoc: firestoreModule.addDoc,
        collection: firestoreModule.collection,
        serverTimestamp: firestoreModule.serverTimestamp,
      };

      return firebaseHelpersRef.current;
    } catch (error) {
      console.error("[Newsletter] Failed to load Firebase:", error);
      return null;
    }
  };

  const saveToFirebase = async (leadName, leadEmail) => {
    const helpers = await loadFirebase();
    if (!helpers) {
      return { success: false, error: "Firebase unavailable" };
    }

    const { db, addDoc, collection, serverTimestamp } = helpers;

    try {
      const docRef = await addDoc(collection(db, newsletterCollection), {
        name: leadName.trim(),
        email: leadEmail.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        source: "newsletter_component",
      });

      return { success: true, docId: docRef.id };
    } catch (error) {
      console.error("[Newsletter] Firestore write failed:", error);
      return { success: false, error: error.message };
    }
  };

  const handleNameSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter your name");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setErrorMessage("");
    setShowEmail(true);
  };

  const submitToMailchimp = (userEmail) => {
    return new Promise((resolve) => {
      // Create a hidden iframe for Mailchimp submission
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "mailchimp-form-iframe";
      document.body.appendChild(iframe);

      // Create a form
      const form = document.createElement("form");
      form.action =
        "https://gmail.us15.list-manage.com/subscribe/post?u=f039ab124ecbe9e0893d12cc8&id=91ee2091ac&f_id=006999e1f0";
      form.method = "POST";
      form.target = "mailchimp-form-iframe";

      // Add form fields
      const emailField = document.createElement("input");
      emailField.type = "email";
      emailField.name = "EMAIL";
      emailField.value = userEmail;
      form.appendChild(emailField);

      // Honeypot field
      const honeypot = document.createElement("input");
      honeypot.type = "text";
      honeypot.name = "b_f039ab124ecbe9e0893d12cc8_91ee2091ac";
      honeypot.value = "";
      honeypot.tabIndex = -1;
      form.appendChild(honeypot);

      // Append form to body and submit
      document.body.appendChild(form);
      form.submit();

      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        resolve(true);
      }, 1000);
    });
  };

  const handleEmailSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (!trimmedName) {
      setErrorMessage("Please enter your name first");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    let firebaseSuccess = false;
    let mailchimpSuccess = false;

    // Step 1: Save to Firebase
    try {
      const result = await saveToFirebase(trimmedName, trimmedEmail);
      firebaseSuccess = Boolean(result?.success);

      if (!firebaseSuccess) {
        console.error("[Newsletter] Firebase submission failed:", result?.error);
        setErrorMessage("Subscription failed. Please try again later.");
        setIsSubmitting(false);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
    } catch (error) {
      console.error("[Newsletter] Firebase submission error:", error);
      setErrorMessage("Subscription failed. Please try again later.");
      setIsSubmitting(false);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    // Step 2: Submit to Mailchimp (only if Firebase succeeded)
    try {
      await submitToMailchimp(trimmedEmail);
      mailchimpSuccess = true;
      console.log("[Newsletter] Mailchimp submission successful");
    } catch (error) {
      console.error("[Newsletter] Mailchimp submission error:", error);
      // Don't fail the whole process if Mailchimp fails
      // Firebase is the source of truth
    }

    // Step 3: Show success message
    if (firebaseSuccess) {
      setIsOpen(true);
      setName("");
      setEmail("");
      setShowEmail(false);
      setErrorMessage("");
    }

    setIsSubmitting(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showEmail) {
        handleEmailSubmit();
      } else {
        handleNameSubmit();
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        // Animate down
        dropdownRef.current.style.transform = "translateY(0%)";
      } else {
        // Animate up (initially hidden)
        dropdownRef.current.style.transform = "translateY(-100%)";
      }
    }
  }, [isOpen]);

  return (
   <>
      <div className="w-screen h-screen bg-[#EFEFEF] relative overflow-hidden">
        <img
          src="/1.png"
          alt=""
          className="
    absolute 
    w-[45vw]
    max-[1400px]:w-[50vw]
    max-[1220px]:w-[60vw]
    max-[900px]:w-[80vw]
    max-[600px]:w-[150vw] max-[600px]:h-[120vw]   /* <── bigger than screen */
    h-auto
    top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    pointer-events-none
    z-0
  "
        />

        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[80px] text-red-400 z-50">
          <img src="/HueedLogo.png" alt="" />
        </div>
        <div
          className={`w-screen h-screen flex items-center justify-center transition-all duration-500 ${
            isOpen ? "blur-sm" : "blur-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center z-20">
            <h2
              className="text-[36px] leading-[40px] max-[500px]:text-[42px] tracking-[-0.5px] flex flex-col items-center justify-center mb-4  max-[500px]:leading-[50px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              <span className="text-[#303030]">Are You</span>
              <span className="text-[#303030]">
                A{" "}
                <span style={{ fontFamily: "eb-garamond-italic" }}>
                  Hueman?
                </span>
              </span>
            </h2>
            <p
              className=" text-[12px] text-[#303030] text-center tracking-[4px] max-[500px]:tracking-[4px] uppercase max-[500px]:text-[10px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Join Our Newsletter
            </p>

            <div className="relative w-[310px] max-[500px]:w-[270px] h-[40px] mt-[40px]">
              {/* Name Input */}
              <div
                className={`absolute inset-0 inline-flex items-center border-b-2 border-[#c7c7c7] px-2 transition-all duration-500 leading-none ${
                  showEmail
                    ? "opacity-0 translate-y-[-20px] pointer-events-none"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full text-[#303030] text-[16px] max-[500px]:text-[14px] outline-none placeholder-[#c7c7c7] bg-transparent"
                  placeholder="NAME"
                  style={{ fontFamily: "frankton-mono-bold" }}
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleNameSubmit}
                  className="ml-4 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={isSubmitting}
                >
                  <IoIosArrowRoundForward className="text-[32px] cursor-pointer text-[#303030]" />
                </button>
              </div>

              {/* Email Input */}
              <div
                className={`absolute inset-0 inline-flex items-center border-b-2 border-[#c7c7c7] px-2 transition-all duration-500 leading-none ${
                  showEmail
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[20px] pointer-events-none"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full text-[#303030] text-[16px] max-[500px]:text-[14px] outline-none placeholder-[#c7c7c7] bg-transparent "
                  placeholder="EMAIL"
                  style={{ fontFamily: "frankton-mono-bold" }}
                  disabled={isSubmitting}
                />
                <button
                  onClick={handleEmailSubmit}
                  className="ml-4 hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-[32px] h-[32px] flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[#303030] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <IoIosArrowRoundForward className="text-[32px] cursor-pointer text-[#303030]" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p
                className="text-red-500 text-[14px] max-[500px]:text-[12px] mt-4 text-center"
                style={{ fontFamily: "frankton-mono-bold" }}
              >
                {errorMessage}
              </p>
            )}

            <p
              className=" text-[#303030] w-[400px] max-[500px]:w-[260px] text-center  text-[22px]
                max-[1600px]:w-[340px] max-[1600px]:text-[18px] max-[1600px]:leading-[22px] 
               max-[500px]:text-[18px] tracking-[-0.2px] leading-[26px] max-[500px]:leading-[21px] mt-[28px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              To be a{" "}
              <span style={{ fontFamily: "eb-garamond-italic" }}>Hueman</span>{" "}
              is to own more than a garment; it is to own a part of a hue, a
              living story that resonates deeply within us all.
            </p>
          </div>
        </div>

        {/* dropdown content */}
        <div
          ref={dropdownRef}
          className="w-full h-[60vh] bg-[#F7F7F7] z-20 absolute top-0 transition-transform duration-500 ease-in-out"
          style={{ transform: "translateY(-100%)" }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <h2
              className="text-[36px] max-[500px]:text-[40px] tracking-[-0.5px] flex flex-col items-center justify-center mb-4 leading-[42px] max-[500px]:leading-[50px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              <span className="text-[#303030]">Launching Soon..</span>
            </h2>
            <p
              className=" text-[12px] text-[#303030] text-center tracking-[6px] max-[500px]:tracking-[4px] uppercase max-[500px]:text-[10px] mt-[2px] "
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Welcome hueman
            </p>

            <p
              className=" text-[#303030] w-[400px] max-[500px]:w-[220px] text-center  text-[22px] max-[1600px]:text-[18px] max-[1600px]:leading-[22px] max-[500px]:text-[18px] tracking-[-0.12px] leading-[26px] max-[500px]:leading-[21px] mt-[30px]"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              We're excited to have you on board and can't wait to share
              valuable insights and exciting content with you.
            </p>
            <button
              onClick={handleClose}
              className="text-[#303030] text-[18px] max-[500px]:text-[20px] absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded transition-colors"
              style={{ fontFamily: "eb-garamond-regular" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default Newsletter;
