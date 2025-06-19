"use client";

import { useEffect } from "react";
import Head from "next/head";
import "./user.css";

export default function UserPage() {
  useEffect(() => {
    const itemList = document.getElementById("nr-item-list");
    const articleCount = document.getElementById("nr-article-count");
    const totalPrice = document.getElementById("nr-total-price");
    if (!itemList || !articleCount || !totalPrice) return;

    const updateSummary = () => {
      const items = itemList.querySelectorAll<HTMLElement>(".nr-item");
      let count = 0;
      let total = 0;
      items.forEach((item) => {
        const qtyElem = item.querySelector(".qty");
        const qty = qtyElem ? parseInt(qtyElem.textContent || "0") : 0;
        const price = parseFloat(item.getAttribute("data-price") || "0");
        if (qty > 0) {
          count += qty;
          total += qty * price;
        }
      });
      articleCount.innerText = `${count} Article${count > 1 ? "s" : ""}`;
      totalPrice.innerText = `${total.toFixed(3)} dt`;
    };

    itemList.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("plus") || target.classList.contains("minus")) {
        const qtyElem = target.parentElement?.querySelector(".qty");
        if (!qtyElem) return;
        let qty = parseInt(qtyElem.textContent || "0");
        if (target.classList.contains("plus")) qty++;
        else if (qty > 0) qty--;
        qtyElem.textContent = `${qty}`;
        updateSummary();
      }
    });

    const catButtons = document.querySelectorAll<HTMLButtonElement>(".nr-categories .cat");
    catButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        catButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedCat = btn.getAttribute("data-cat");
        const items = document.querySelectorAll<HTMLElement>(".nr-items .nr-item");
        items.forEach((item) => {
          const itemCat = item.getAttribute("data-cat");
          if (!selectedCat || selectedCat === itemCat) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    const serviceCards = document.querySelectorAll<HTMLAnchorElement>('a[data-service]');
    const newReservationSection = document.getElementById("new-reservation");
    const dashboardSection = document.getElementById("dashboard");
    const backBtn = document.querySelector<HTMLAnchorElement>(".back-btn");
    const categoriesContainer = document.querySelector<HTMLDivElement>(".nr-categories");
    const serviceTitle = document.querySelector<HTMLElement>("#new-reservation h2");

    serviceCards.forEach(card => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        const serviceType = card.getAttribute("data-service");
        const serviceName = card.querySelector("h2")?.textContent || "Service";
        
        // Update service title
        if (serviceTitle) {
          serviceTitle.innerHTML = `<i class="fa fa-${serviceType === 'repassage' ? 'tshirt' : 'soap'}"></i> ${serviceName}`;
        }
        
        // Update categories based on service type
        if (categoriesContainer) {
          if (serviceType === 'repassage') {
            categoriesContainer.innerHTML = `
              <button class="cat active" data-cat="categorie-a">
                <i class="fa fa-tag"></i>
                <span>Homme</span>
              </button>
              <button class="cat" data-cat="categorie-b">
                <i class="fa fa-tag"></i>
                <span>Femme</span>
              </button>
              <button class="cat" data-cat="categorie-c">
                <i class="fa fa-tag"></i>
                <span>Linge maison</span>
              </button>
            `;
          } else {
            // Default categories for other services
            categoriesContainer.innerHTML = `
              <button class="cat active" data-cat="homme">
                <i class="fa fa-user-tie"></i>
                <span>Homme</span>
              </button>
              <button class="cat" data-cat="femme">
                <i class="fa fa-user"></i>
                <span>Femme</span>
              </button>
              <button class="cat" data-cat="linge">
                <i class="fa fa-home"></i>
                <span>Linge Maison</span>
              </button>
            `;
          }
          
          // Re-attach category click handlers
          attachCategoryHandlers();
        }
        
        // Show the reservation section
        dashboardSection?.classList.add("hidden");
        newReservationSection?.classList.remove("hidden");
      });
    });
    
    // Function to attach click handlers to category buttons
    function attachCategoryHandlers() {
      const catButtons = document.querySelectorAll<HTMLButtonElement>(".nr-categories .cat");
      catButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          catButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const selectedCat = btn.getAttribute("data-cat");
          const items = document.querySelectorAll<HTMLElement>(".nr-items .nr-item");
          items.forEach((item) => {
            const itemCat = item.getAttribute("data-cat");
            if (!selectedCat || selectedCat === itemCat) {
              item.style.display = "flex";
            } else {
              item.style.display = "none";
            }
          });
        });
      });
    }

    backBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      newReservationSection?.classList.add("hidden");
      dashboardSection?.classList.remove("hidden");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Tableau de Bord - Yalla Clean</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </Head>

      <header>
        <nav>
          <div className="logo">Yalla Clean</div>
          <ul>
            <li>
              <a href="#dashboard">Tableau de Bord</a>
            </li>
            <li>
              <a href="#reservations">Mes Réservations</a>
            </li>
            <li>
              <a href="#shop">Boutique</a>
            </li>
            <li>
              <a href="#account">Mon Compte</a>
            </li>
            <li>
              <a href="#logout">Déconnexion</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="dashboard">
          <h1>Bienvenue, [Nom Utilisateur]!</h1>
          <p>Que souhaitez-vous faire aujourd'hui ?</p>
          <div className="dashboard-actions">
            <a href="#new-reservation" className="card" data-service="nettoyage">
              <h2><i className="fa fa-soap"></i> Nettoyage</h2>
              <p>Service de nettoyage à sec et lavage</p>
            </a>
            <a href="#new-reservation" className="card" data-service="repassage">
              <h2><i className="fa fa-tshirt"></i> Repassage</h2>
              <p>Service de repassage professionnel</p>
            </a>
            <a href="#new-reservation" className="card" data-service="tapis">
              <h2><i className="fa fa-rug"></i> Tapis</h2>
              <p>Nettoyage de tapis et moquettes</p>
            </a>
            <a href="#new-reservation" className="card" data-service="rideaux">
              <h2><i className="fa fa-window-maximize"></i> Rideaux</h2>
              <p>Nettoyage de rideaux et voilages</p>
            </a>
            <a href="#new-reservation" className="card" data-service="teinture">
              <h2><i className="fa fa-fill-drip"></i> Teinture</h2>
              <p>Service de teinture de vêtements</p>
            </a>
            <a href="#new-reservation" className="card" data-service="sport">
              <h2><i className="fa fa-futbol"></i> Articles de sport</h2>
              <p>Nettoyage spécialisé pour équipements sportifs</p>
            </a>
            <a href="#new-reservation" className="card" data-service="extra">
              <h2><i className="fa fa-star"></i> Services spéciaux</h2>
              <p>Autres services sur mesure</p>
            </a>
            <a href="#shop" className="card">
              <h2><i className="fa fa-shopping-cart"></i> Boutique</h2>
              <p>Découvrez nos produits d'entretien</p>
            </a>
          </div>
        </section>

        <section id="new-reservation" className="hidden">
          <div className="nr-header">
            <a href="#dashboard" className="back-btn">
              <i className="fa fa-arrow-left"></i>
            </a>
            <h2>
              <i className="fa fa-soap"></i> Nettoyage
            </h2>
          </div>
          <div className="nr-categories">
            <button className="cat active" data-cat="homme">
              <i className="fa fa-user-tie"></i>
              <span>Homme</span>
            </button>
            <button className="cat" data-cat="femme">
              <i className="fa fa-user"></i>
              <span>Femme</span>
            </button>
            <button className="cat" data-cat="enfants">
              <i className="fa fa-baby"></i>
              <span>Enfants</span>
            </button>
            <button className="cat" data-cat="linge">
              <i className="fa fa-shirt"></i>
              <span>Linge maison</span>
            </button>
            <button className="cat" data-cat="traditionnel">
              <i className="fa fa-tshirt"></i>
              <span>Traditionnels</span>
            </button>
          </div>
          <ul className="nr-items" id="nr-item-list">
            {[
              // Homme category items
              { name: 'cravate', price: 2, category: 'homme' },
              { name: 'pantacourt', price: 3, category: 'homme' },
              { name: 'short', price: 3, category: 'homme' },
              { name: 'Casquette', price: 3.5, category: 'homme' },
              { name: 'Pull', price: 3.5, category: 'homme' },
              { name: 'T-shirt', price: 3.5, category: 'homme' },
              { name: 'Polo', price: 3.8, category: 'homme' },
              { name: 'Pantalon', price: 4, category: 'homme' },
              { name: 'Chemise', price: 4, category: 'homme' },
              { name: 'Chemise blanche', price: 4.2, category: 'homme' },
              { name: 'Sweet-shirt', price: 4.5, category: 'homme' },
              { name: 'Gilet', price: 5, category: 'homme' },
              { name: 'Veste', price: 6, category: 'homme' },
              { name: 'Blazer', price: 6, category: 'homme' },
              { name: 'Doudoune sans manche', price: 6, category: 'homme' },
              { name: 'Doudoune', price: 7, category: 'homme' },
              { name: 'Blouson', price: 7, category: 'homme' },
              { name: 'Manteau cachemire 3/4', price: 9, category: 'homme' },
              { name: 'Bombers', price: 9, category: 'homme' },
              { name: 'Manteau', price: 9, category: 'homme' },
              { name: 'Parka', price: 10, category: 'homme' },
              { name: 'Doudoune longue', price: 10, category: 'homme' },
              { name: 'Vest simili cuir', price: 12, category: 'homme' },
              { name: 'Trench', price: 10, category: 'homme' },
              { name: 'Manteau cachemire', price: 10, category: 'homme' },
              { name: 'Costume 2 pièces', price: 10, category: 'homme' },
              { name: 'Costume 3 pièces', price: 12, category: 'homme' },
              { name: 'Veste daim', price: 15, category: 'homme' },
              { name: 'Veste cuir', price: 25, category: 'homme' },
              { name: 'Cache-col', price: 1.5, category: 'homme' },
              { name: 'Bonnet', price: 2, category: 'homme' },
              
              // Femme category items
              { name: 'Short', price: 3, category: 'femme' },
              { name: 'Pantalon', price: 3.5, category: 'femme' },
              { name: 'Casquette', price: 3.5, category: 'femme' },
              { name: 'Chemise', price: 4, category: 'femme' },
              { name: 'T-shirt', price: 3.8, category: 'femme' },
              { name: 'Chemise blanche', price: 4.5, category: 'femme' },
              { name: 'Pull', price: 4, category: 'femme' },
              { name: 'Jupe simple', price: 4, category: 'femme' },
              { name: 'Sweet-shirt', price: 4.5, category: 'femme' },
              { name: 'Jupe dentelle', price: 5, category: 'femme' },
              { name: 'Gilet', price: 5, category: 'femme' },
              { name: 'Veste', price: 6, category: 'femme' },
              { name: 'Doudoune sans manche', price: 6, category: 'femme' },
              { name: 'Cape', price: 6, category: 'femme' },
              { name: 'Robe simple', price: 7, category: 'femme' },
              { name: 'Manteau cachemire 3/4', price: 9, category: 'femme' },
              { name: 'Doudoune', price: 7, category: 'femme' },
              { name: 'Manteau', price: 9, category: 'femme' },
              { name: 'Combinaison', price: 9, category: 'femme' },
              { name: 'Doudoune longue', price: 10, category: 'femme' },
              { name: 'Parka', price: 9, category: 'femme' },
              { name: 'Robe longue', price: 10, category: 'femme' },
              { name: 'Manteau cachemire', price: 10, category: 'femme' },
              { name: 'Trench', price: 10, category: 'femme' },
              { name: 'Veste cuir', price: 12, category: 'femme' },
              { name: 'Tailleur 2 pièces', price: 10, category: 'femme' },
              { name: 'Veste daim', price: 15, category: 'femme' },
              { name: 'Trench simili', price: 15, category: 'femme' },
              { name: 'Manteau fourrure', price: 15, category: 'femme' },
              { name: 'Robe soirée', price: 25, category: 'femme' },
              { name: 'Bonnet', price: 2, category: 'femme' },
              { name: 'Foulard', price: 2.5, category: 'femme' },
              { name: 'Cache-col', price: 1.5, category: 'femme' },
              { name: 'Botte', price: 15, category: 'femme' },
              
              // Enfants category items
              { name: 'Pantalon', price: 2, category: 'enfants' },
              { name: 'Chemise', price: 2.5, category: 'enfants' },
              { name: 'Pull', price: 2.5, category: 'enfants' },
              { name: 'Jupe', price: 2.5, category: 'enfants' },
              { name: 'Robe', price: 3, category: 'enfants' },
              { name: 'Baskets', price: 4, category: 'enfants' },
              { name: 'Salopette', price: 5, category: 'enfants' },
              { name: 'Manteau', price: 5, category: 'enfants' },
              { name: 'Cartable scolaire', price: 12, category: 'enfants' },
              
              // Linge maison category items
              { name: 'Couvre-lit', price: 25, category: 'linge' },
              { name: 'Parure de lit complet', price: 18, category: 'linge' },
              { name: 'Couette blanche', price: 8.5, category: 'linge' },
              { name: 'Couette', price: 8.5, category: 'linge' },
              { name: 'Couverture', price: 8.5, category: 'linge' },
              { name: 'Plaid', price: 6, category: 'linge' },
              { name: 'Housse matelas', price: 6, category: 'linge' },
              { name: 'Cap de bain', price: 6, category: 'linge' },
              { name: 'Drap', price: 5, category: 'linge' },
              { name: 'Nappe', price: 5, category: 'linge' },
              { name: 'Drap de bain', price: 4, category: 'linge' },
              { name: 'Tablier', price: 4, category: 'linge' },
              { name: 'Serviette de bain', price: 2.5, category: 'linge' },
              { name: 'Taie d\'oreiller', price: 2, category: 'linge' },
              { name: 'Devant', price: 3, category: 'linge' },
              
              // Traditionnel category items  
              { name: 'Jebba', price: 10, category: 'traditionnel' },
              { name: 'Kamis', price: 8, category: 'traditionnel' },
              { name: 'Dengri 2 pièces', price: 12, category: 'traditionnel' },
              { name: 'Sefsari', price: 15, category: 'traditionnel' },
              { name: 'Koftan', price: 25, category: 'traditionnel' },
              { name: 'Jelbeb', price: 15, category: 'traditionnel' }
            ].map((item, index) => (
              <li key={`${item.category}-${index}`} className="nr-item" data-price={item.price} data-cat={item.category}>
                <div className="item-info">
                  <img src="https://via.placeholder.com/40" alt={item.name.toLowerCase()} />
                  <div>
                    <p className="name">{item.name}</p>
                    <p className="price">{item.price.toFixed(2)} dt</p>
                  </div>
                </div>
                <div className="item-qty">
                  <button className="minus">-</button>
                  <span className="qty">0</span>
                  <button className="plus">+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="nr-summary">
            <div className="nr-total">
              <p id="nr-article-count">0 Article</p>
              <p id="nr-total-price">0 dt</p>
            </div>
            <button id="nr-next" className="btn-next">
              Suivant
            </button>
          </div>
        </section>

        <section id="reservations">
          <h2>Mes Réservations</h2>
          <div className="reservation-list">
            <p>Vous n'avez aucune réservation pour le moment.</p>
          </div>
        </section>

        <section id="shop">
          <h2>Boutique</h2>
          <div className="product-list">
            <p>La boutique est en cours de construction.</p>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Yalla Clean. Tous droits réservés.</p>
      </footer>
    </>
  );
}
