
const css = `
  
  .pricing-details {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    border: 1px solid #f1f1f1;
    --gray-light: #f9fafb;
    --gray: #f3f4f6;
    --starter: transparent;
    --pro: transparent;
    --enterprise: transparent;
    font-size: 0.9rem;
    box-shadow: 0 10px 26px rgba(2, 6, 23, .10);
  }

  .pricing-details th,
  .pricing-details td {
    padding: 0.6rem;
    text-align: left;
    border-bottom: 1px solid var(--gray);
  }

  .pricing-details th {
    background-color: var(--gray-light);
    font-weight: 600;
  }

  .pricing-details th:not(:first-child) {
    text-align: center;
  }

  .pricing-details td:not(:first-child) {
    text-align: center;
  }

  .pricing-details td:first-child {
    font-weight: 500;
  }

  .pricing-details .feature-category {
    background-color: var(--gray-light);
    font-weight: 600;
  }

  .pricing-details .feature-category td {
    padding-top: 1.0rem;
    padding-bottom: 1.0rem;
    font-weight: bold !important;
  }

  .pricing-details .check {
    color: #154785;
    font-size: 1.25rem;
    font-weight: bold;
  }

  .pricing-details .cross {
    color: #bcbcbc;
    font-size: 1.25rem;
  }

  .pricing-details .plan-header {
    font-weight: 600;
    text-align: center !important;
  }

  .pricing-details .starter-header {
    background-color: var(--starter) !important;
  }

  .pricing-details .pro-header {
    background-color: var(--pro) !important;
  }

  .pricing-details .enterprise-header {
    background-color: var(--enterprise) !important;
  }

  @media (max-width: 576px) {

    .pricing-details {    
      font-size: 0.7rem;
    }
  }


`

class ZyllioPricingDetails extends HTMLElement {

  constructor() {

    super()

    const style = document.createElement("style")

    style.textContent = css

    this.prepend(style)
  }
}

customElements.define('zyllio-pricing-details', ZyllioPricingDetails)