import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import ArnesBeltTrailer from "./pages/products/ArnesBeltTrailer";
import ManacStepDeck from "./pages/products/ManacStepDeck";
import AlphaLowboy from "./pages/products/AlphaLowboy";
import ReitnourConestoga from "./pages/products/ReitnourConestoga";
import KenworthT800 from "./pages/products/KenworthT800";
import FreightlinerCascadia from "./pages/products/FreightlinerCascadia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inventory/used-2021-arnes-trout-river-belt-trailer" element={<ArnesBeltTrailer />} />
          <Route path="/inventory/2023-manac-53-ft-stepdeck-trailer" element={<ManacStepDeck />} />
          <Route path="/inventory/2023-alpha-hd-a80mg-lowboy-trailer" element={<AlphaLowboy />} />
          <Route path="/inventory/2022-reitnouer-conestoga-big-bubba-quad" element={<ReitnourConestoga />} />
          <Route path="/inventory/used-2024-kenworth-t800" element={<KenworthT800 />} />
          <Route path="/inventory/2020-freightliner-cascadia" element={<FreightlinerCascadia />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
