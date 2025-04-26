import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import MasnaviDetail from "@/pages/MasnaviDetail";
import DivanDetail from "@/pages/DivanDetail";
import About from "@/pages/About";
import Search from "@/pages/Search";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoemModal from "@/components/PoemModal";
import { PoemProvider } from "@/hooks/use-poem";

function App() {
  // State for poem modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPoem, setModalPoem] = useState<any>(null);
  
  // Function to open poem modal
  const openPoemModal = (poem: any) => {
    setModalPoem(poem);
    setIsModalOpen(true);
  };
  
  // Function to close poem modal
  const closePoemModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PoemProvider value={{ openPoemModal }}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/masnavi/:daftarNumber" component={MasnaviDetail} />
            <Route path="/divan/:ghazalNumber" component={DivanDetail} />
            <Route path="/about" component={About} />
            <Route path="/search" component={Search} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        
        {isModalOpen && modalPoem && (
          <PoemModal 
            poem={modalPoem} 
            isOpen={isModalOpen} 
            onClose={closePoemModal} 
          />
        )}
      </div>
    </PoemProvider>
  );
}

export default App;
