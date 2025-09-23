import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: "Embroidered Trench Coat",
      color: "Midnight Black",
      price: "299.99",
      images:["/catalogue-dress.png","/lookbook-sample.png","/catalogue-dress.png"] ,
      details: "This coat embodies “The Breeze Art”Inspired by the South East Asian Breeze— an elemental touch of the sky, this artwork embodies the grace of air in motion, translated through delicate, tone-on-tone embroidery. Each thread weaves a narrative of winds quiet Calm, capturing the dance across the garment’s surface.",
      packaginDetails: "Eco-friendly packaging made from recycled materials. Includes charging cable, carrying case, and user manual.",
      sizes: ["XS", "S","M", "L","XL"]
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      color: "Midnight Black",
      price: "299.99",
      img: "/catalogue-dress.png",
      details: "This coat embodies “The Breeze Art”Inspired by the South East Asian Breeze— an elemental touch of the sky, this artwork embodies the grace of air in motion, translated through delicate, tone-on-tone embroidery. Each thread weaves a narrative of winds quiet Calm, capturing the dance across the garment’s surface.",
      packaginDetails: "Eco-friendly packaging made from recycled materials. Includes charging cable, carrying case, and user manual.",
      sizes: ["XS", "S","M", "L","XL"]
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      color: "Midnight Black",
      price: "299.99",
      img: "/catalogue-dress.png",
      details: "This coat embodies “The Breeze Art”Inspired by the South East Asian Breeze— an elemental touch of the sky, this artwork embodies the grace of air in motion, translated through delicate, tone-on-tone embroidery. Each thread weaves a narrative of winds quiet Calm, capturing the dance across the garment’s surface.",
      packaginDetails: "Eco-friendly packaging made from recycled materials. Includes charging cable, carrying case, and user manual.",
      sizes: ["XS", "S","M", "L","XL"]
    },
  ],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;