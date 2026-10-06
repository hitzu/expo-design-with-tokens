/*
 * Contenido (textos) de cada tenant.
 *
 * Separado a propósito de themes.json: el tema decide CÓMO se ve,
 * este archivo decide QUÉ dice. Aquí no hay ni un solo color.
 * Ambos tenants son ficticios y del MISMO negocio (panadería y pastelería),
 * con las mismas secciones: lo único que cambia entre ellos es el tema.
 */
export const tenantContent = {
  aurora: {
    brand: {
      name: 'Casa Aurora',
      tagline: 'Pastelería de autor · horneado cada mañana',
      monogram: 'A',
    },
    nav: ['Carta', 'Talleres', 'Encargos', 'Contacto'],
    hero: {
      eyebrow: 'Temporada de otoño',
      title: 'Dulces pequeños para días largos',
      text: 'Masa madre, mantequilla de pastoreo y fruta de temporada. Todo se hornea en el estudio, a mano y en tandas cortas.',
      primary: 'Reservar una caja',
      secondary: 'Ver la carta',
    },
    gallery: {
      title: 'Piezas de la semana',
      items: [
        { title: 'Tarta de higos y miel', meta: '$38 · 8 porciones', tag: 'Nueva' },
        { title: 'Macarons de rosa y lichi', meta: '$18 · caja de 6', tag: 'Favorita' },
        { title: 'Croissant de cardamomo', meta: '$4,50 · unidad', tag: 'Mañanas' },
      ],
    },
    detail: {
      eyebrow: 'Pieza destacada',
      title: 'Pavlova de frutos rojos',
      text: 'Merengue crujiente por fuera y suave por dentro, crema de vainilla batida a mano y frutos rojos del mercado del sábado.',
      facts: [
        ['Porciones', '6 a 8'],
        ['Alérgenos', 'Huevo, lácteos'],
        ['Encargo', '48 h de anticipación'],
      ],
      primary: 'Encargar',
      secondary: 'Guardar',
    },
    contact: {
      title: 'Escríbenos',
      text: 'Encargos para eventos, talleres privados o simplemente para saludar.',
      namePlaceholder: 'Lucía Fernández',
      emailPlaceholder: 'lucia@correo.com',
      messagePlaceholder: 'Quisiera una tarta para 12 personas…',
      submit: 'Enviar mensaje',
      statesTitle: 'Estados del sistema',
    },
    states: {
      success: 'Recibimos tu encargo. Te confirmamos por correo en menos de 24 h.',
      error: 'No pudimos enviar el mensaje. Revisa el correo e inténtalo de nuevo.',
      warning: 'Los encargos para este sábado cierran hoy a las 18:00.',
    },
    footer: 'Casa Aurora · estudio de pastelería ficticio creado para esta demo',
  },

  molino: {
    brand: {
      name: 'Molino Central',
      tagline: 'Panificadora industrial · pan para tiendas y restaurantes',
      monogram: 'M',
    },
    nav: ['Catálogo', 'Rutas', 'Pedidos', 'Contacto'],
    hero: {
      eyebrow: 'Producción de esta semana',
      title: 'Pan fresco a escala, todos los días',
      text: 'Hornos de túnel, masa madre estandarizada y reparto antes de las 6:00. Abastecemos a tiendas, cafeterías y restaurantes con la misma calidad en cada lote.',
      primary: 'Pedir una cotización',
      secondary: 'Ver el catálogo',
    },
    gallery: {
      title: 'Productos de la semana',
      items: [
        { title: 'Pan de caja integral', meta: '$1.200 · lote de 100', tag: 'Nuevo' },
        { title: 'Bollos para hamburguesa', meta: '$900 · lote de 240', tag: 'Más pedido' },
        { title: 'Croissant de mantequilla', meta: '$1.450 · lote de 120', tag: 'Mañanas' },
      ],
    },
    detail: {
      eyebrow: 'Producto destacado',
      title: 'Baguette precocida',
      text: 'Fermentación lenta de 18 horas, horneado al 80 % y ultracongelado. Tu cocina la termina en 8 minutos y sale como recién hecha.',
      facts: [
        ['Presentación', 'Caja de 50'],
        ['Alérgenos', 'Gluten'],
        ['Pedido', '24 h de anticipación'],
      ],
      primary: 'Pedir',
      secondary: 'Guardar',
    },
    contact: {
      title: 'Haz tu pedido',
      text: 'Pedidos recurrentes para tu tienda o restaurante, cotizaciones por volumen o visitas a la planta.',
      namePlaceholder: 'Restaurante La Esquina',
      emailPlaceholder: 'compras@laesquina.com',
      messagePlaceholder: 'Necesitamos 300 bollos diarios desde el lunes…',
      submit: 'Enviar pedido',
      statesTitle: 'Estados del sistema',
    },
    states: {
      success: 'Recibimos tu pedido. Te confirmamos la ruta de entrega en menos de 24 h.',
      error: 'No pudimos enviar el pedido. Revisa el correo e inténtalo de nuevo.',
      warning: 'Los pedidos para el reparto del lunes cierran hoy a las 18:00.',
    },
    footer: 'Molino Central · panificadora ficticia creada para esta demo',
  },
};
