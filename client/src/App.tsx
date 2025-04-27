import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import MasnaviDetail from "@/pages/MasnaviDetail";
import DivanDetail from "@/pages/DivanDetail";
import About from "@/pages/About";
import Search from "@/pages/Search";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";
import { PoemModal } from "@/components/PoemModal";
import { usePoetryStore } from "@/store/poetry-store";

function App() {
  const { selectedPoem, isModalOpen, closeModal } = usePoetryStore();

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/masnavi/:daftarNumber" component={MasnaviDetail} />
        <Route path="/divan/:ghazalNumber" component={DivanDetail} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route component={NotFound} />
      </Switch>

      {isModalOpen && selectedPoem && (
        <PoemModal 
          poem={selectedPoem} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </Layout>
  );
}

export default App;
