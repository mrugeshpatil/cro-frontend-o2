(() => {
  "use strict";

  /* -------------------------------
       0. Define Tariff Data
    -------------------------------- */

  const TARIFFS = [
    {
      id: "128-100",
      storageGB: 128,
      dataAllowance: "100GB",
      upfrontPrice: 30.0,
      monthlyPrice: 38.31,
      deviceCost: 21.36,
      airtimeCost: 16.95,
    },
    {
      id: "128-unlimited",
      storageGB: 128,
      dataAllowance: "Unlimited",
      upfrontPrice: 30.0,
      monthlyPrice: 45.31,
      deviceCost: 21.36,
      airtimeCost: 23.95,
    },
    {
      id: "256-75",
      storageGB: 256,
      dataAllowance: "75GB",
      upfrontPrice: 30.0,
      monthlyPrice: 48.0,
      deviceCost: 23.03,
      airtimeCost: 24.97,
    },
    {
      id: "256-unlimited",
      storageGB: 256,
      dataAllowance: "Unlimited",
      upfrontPrice: 30.0,
      monthlyPrice: 52.3,
      deviceCost: 23.03,
      airtimeCost: 29.27,
    },
  ];
  const PRICE_RISE_2026 = 2.5;
  const PRICE_RISE_2027 = 5.0;
  const formatPrice = (value) => Number(value).toFixed(2);

  const EXPERIMENT_ID = "o2-cro-competitive-tariffs";
  const COLOR_LAVENDER = "#953698";
  const COLOR_BLUE = "#00008c;";

  /* -------------------------------
    Styles
    -------------------------------- */
  const injectStyles = () => {
    if (document.getElementById(EXPERIMENT_ID)) return;

    const style = document.createElement("style");
    style.id = EXPERIMENT_ID;
    style.textContent = `
      .${EXPERIMENT_ID}-wrapper {
        margin-bottom: 24px;
      }

      .${EXPERIMENT_ID}-card {
        position: relative;
        color: ${COLOR_LAVENDER};
        background: #fff;
        min-height: 140px;
        border-radius: 8px;
      }

      .${EXPERIMENT_ID}-badge {
        position: absolute;
        text-align: center;
        font-weight: 600;
        width: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: ${COLOR_LAVENDER};
        color: #fff;
        font-size: 12px;
        padding: 7px 12px 10px 12px;
        border-radius: 8px 8px 0 0;
        letter-spacing: 0.5px;
        white-space: nowrap;
      }

      .${EXPERIMENT_ID}-content {
        background: #fff;
        top: 35px;
        padding: 16px 16px 24px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        position: relative;
        color: ${COLOR_BLUE};
        box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .05), 0 0 12px 0 rgba(0, 0, 0, .1);
        border-radius: 8px;
        z-index: 0;
        background-color: #fff;
      }

      .${EXPERIMENT_ID}-content h3 {
        font-family: Frutiger LT Std\ 65 Bold, Helvetica, Arial, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 40px;
      }

        .${EXPERIMENT_ID}-price {
        font-size: 18px;
        margin-bottom: 8px;
        }

        .${EXPERIMENT_ID}-price .upfront {
        font-size: 12px;
        color: #6f6f6f;
        }

        .${EXPERIMENT_ID}-price-rise {
        font-size: 12px;
        color: #555;
        border-top: 1px solid #eee;
        margin-top: 8px;
        padding-top: 8px;
        }

        .cro-price-block {
        margin-top: 12px;
        font-size: 14px;
        }

        .cro-prices {
        display: flex;
        gap: 8px;
        justify-content: space-between;
        }

        .cro-price-amount {
        font-size: 22px;
        font-weight: 700;
        }

        .cro-price-label {
        display: block;
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        }

        .cro-plus {
        font-weight: 700;
        }

        .cro-price-rise {
        margin-top: 8px;
        font-size: 12px;
        color: #555;
        }

        .cro-price-rise div {
        display: flex;
        justify-content: space-between;
        }

        .cro-breakdown {
        margin-top: 8px;
        font-size: 13px;
        }

        .new-tariff-price-block__monthly-cost {
        text-align: center;
        margin: 16px 0;
        }

        .cro-benefits {
        margin-bottom: 16px;
        }

    `;
    document.head.appendChild(style);
  };

  /* -------------------------------
    Find Angular component
    -------------------------------- */
  const getAngularTariffComponent = () =>
    document.querySelector("o2uk-device-tariff-cards");

  /* -------------------------------
    Helper: Calculate Price Rise
    -------------------------------- */
  const calculatePriceRises = (monthly) => ({
    apr2026: formatPrice(monthly + PRICE_RISE_2026),
    apr2027: formatPrice(monthly + PRICE_RISE_2027),
  });

  /* -------------------------------
     Price Block HTML (Core Piece)
    -------------------------------- */
  const buildPriceBlock = (tariff) => {
    const rises = calculatePriceRises(tariff.monthlyPrice);

    return `
    <div class="cro-price-block">
        <div class="new-tariff-card-plan-info__contract-length">36 month contract</div>
        <div class="cro-prices">
            <div class="cro-price-upfront">
            <span class="cro-price-amount">£${formatPrice(
              tariff.upfrontPrice
            )}</span>
            <span class="cro-price-label">Upfront</span>
            </div>
            <span class="cro-plus">+</span>
            <div class="cro-price-monthly">
            <span class="cro-price-amount">£${formatPrice(
              tariff.monthlyPrice
            )}</span>
            <span class="cro-price-label">Monthly</span>
            </div>
        </div>

        <div class="cro-price-rise">
            <div><span>From Apr 2026 bill</span><span>£${
              rises.apr2026
            }</span></div>
            <div><span>From Apr 2027 bill</span><span>£${
              rises.apr2027
            }</span></div>
        </div>

        <div class="new-tariff-price-block__monthly-cost">
            <strong>Monthly cost breakdown:</strong>
            <div class="amount-info-monthly_large font_bold">£${formatPrice(
              tariff.deviceCost
            )} Device + £${formatPrice(tariff.airtimeCost)} Airtime</div>
        </div>

        <div class="new-tariff-price-block__price-rise-container price-rise-link">
            <span class="sr-only">Price rises every April bill thereafter by £2.50. See plan information|see-plan-information</span>  
            <span aria-hidden="true">Price rises every April bill thereafter by £2.50. 
                <button class="o2uk-link " null="" data-id="see-plan-information" autotest-target="undefined" aria-haspopup="null">
                    See plan information
                </button></span>  
            <span role="button" class="sr-only" aria-disabled="undefined">See plan information</span>
        </div>

    </div>
  `;
  };

  /* -------------------------------
    Detect Active Capacity
    -------------------------------- */
  const getSelectedCapacity = () => {
    const activeBtn = document.querySelector(
      '[data-testid="capacity-selector"].active, .capacity-selector .active'
    );

    if (!activeBtn) return 128;

    return activeBtn.textContent.includes("256") ? 256 : 128;
  };

  /* -------------------------------
    Build Full Tariff Card With Price Block
    -------------------------------- */
  const buildTariffCard = (tariff) => {
    const col = document.createElement("div");
    col.className =
      "col-lg-4 col-md-4 col-sm-4 col-xs-4 _margin_bottom-l _margin_top-xs";

    col.innerHTML = `
            <div class="${EXPERIMENT_ID}-card">
            <div class="${EXPERIMENT_ID}-badge">Online Exclusive</div>

            <div class="${EXPERIMENT_ID}-content">
            
           
                <div class="new-tariff-card-plan-info__allowance">${
                  tariff.dataAllowance
                }</div>
                

                <div class="new-tariff-card-plan-info__fair-usage-link ng-star-inserted">
	                <a href="https://www.o2.co.uk/termsandconditions/mobile/o2-consumer-fair-usage-policy" target="_blank">Fair usage applies<span class="sr-only" style="position: absolute !important;">&nbsp;Opens in new tab</span></a>
                </div>

                

                ${buildPriceBlock(tariff)}


                <div class="new-tariff-promo-block-primary__section-title">Offer</div>
                <div class="ng-star-inserted">
                    <button 
                        class="new-tariff-promo-block-primary__container" 
                        data-cro-offer
                        style="background-color: ${COLOR_LAVENDER};"
                    >
                        <div class="new-tariff-promo-block-primary__title">
                            <span class="o2uk-icon-font icon-chevron-normal new-tariff-promo-block-primary__title-icon"></span> 
                                Get the Galaxy S25 for an exclusive low price. Ends 31 January.
                        </div>
                    </button>
                </div>

                <details class="cro-benefits">
                    <summary>Benefits</summary>
                    <ul>
                        <li>Roam freely in the EU, up to 25GB</li>
                        <li>Unlimited UK minutes & texts</li>
                    </ul>
                </details>


                <button class="tariff-card__add-button o2uk-primary-button">
                Choose this plan
                </button>
            </div>
            </div>
        `;

    return col;
  };

  /* -------------------------------
    Render Cards Based on Capacity
    -------------------------------- */
  const renderTariffsByCapacity = () => {
    const capacity = getSelectedCapacity();
    const row = document.querySelector(`.${EXPERIMENT_ID}-wrapper .row`);
    if (!row) return;

    row.innerHTML = "";

    TARIFFS.filter((t) => t.storageGB === capacity).forEach((tariff) => {
      row.appendChild(buildTariffCard(tariff));
    });
  };

  /* -------------------------------
     Insert BEFORE Angular root
    -------------------------------- */
  const insertTariffs = () => {
    const angularRoot = getAngularTariffComponent();
    if (!angularRoot) return;

    if (document.querySelector(`.${EXPERIMENT_ID}-wrapper`)) return;

    const wrapper = document.createElement("div");
    wrapper.className = `${EXPERIMENT_ID}-wrapper o2uk-container`;

    const row = document.createElement("div");
    row.className = "row center";

    wrapper.appendChild(row);
    angularRoot.parentNode.insertBefore(wrapper, angularRoot);
  };

  /* -------------------------------
     Detect Capacity Switch
    -------------------------------- */
  const observeCapacityChange = () => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".capacity-selector")) {
        setTimeout(renderTariffsByCapacity, 50);
      }
    });
  };

  /* -------------------------------
     Detect Capacity Switch
    -------------------------------- */
  const fadeExistingTariffs = () => {
    document.querySelectorAll("o2uk-commercial-tariff-card").forEach((card) => {
      card.style.opacity = "0.6";
    });
  };

  /* -------------------------------
    Init (poll until Angular ready)
    -------------------------------- */
  const init = () => {
    injectStyles();
    observeCapacityChange();
    fadeExistingTariffs();

    const interval = setInterval(() => {
      insertTariffs();

      if (document.querySelector(`.${EXPERIMENT_ID}-wrapper`)) {
        renderTariffsByCapacity();
        clearInterval(interval);
      }
    }, 300);
  };

  init();
})();
