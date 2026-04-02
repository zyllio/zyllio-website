const modules = [
  './nav.component.mjs',
  './header.component.mjs',
  './sign-in.component.mjs',
  './section.component.mjs',
  './card.component.mjs',
  './card-text.component.mjs',
  './card-image.component.mjs',
  './card-icon.component.mjs',
  './price-plan.component.mjs',
  './price-plan-plus.component.mjs',
  './price-plan-content.component.mjs',
  './stat.component.mjs',
  './testimonial.component.mjs',
  './contact.component.mjs',
  './integration.component.mjs',
  './footer.component.mjs',
  './blog.component.mjs',
  './language-selector.component.mjs',
  './carousel.component.mjs',
  './tutorial.component.mjs',
  './customer.component.mjs',
  './marquee.component.mjs',
  './demo.component.mjs',
  './pricing-details.component.mjs',
  './hosting-badge.mjs',
  './header-stat.component.mjs',
  './masonry-card.component.mjs',
  './masonry.component.mjs',
  './affiliate-hero.component.mjs',
  './affiliate-simulator.component.mjs',
  './affiliate-contact-form.component.mjs',
  './contact-modal.component.mjs'
]

Promise.all(modules.map(path => import(path))).then(() => {

  document.querySelectorAll('zyllio-nav, zyllio-header, zyllio-section, zyllio-footer')
    .forEach(el => el.style.visibility = 'visible')

})