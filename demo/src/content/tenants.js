/*
 * Contenido (textos) de cada tenant.
 *
 * Separado a propósito de themes.json: el tema decide CÓMO se ve,
 * este archivo decide QUÉ dice. Aquí no hay ni un solo color.
 * Ambos tenants son ficticios.
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

  nocturne: {
    brand: {
      name: 'Nocturne',
      tagline: 'Club de música en vivo · hasta que salga el sol',
      monogram: 'N',
    },
    nav: ['Agenda', 'Artistas', 'Reservas', 'Contacto'],
    hero: {
      eyebrow: 'Esta semana en vivo',
      title: 'El volumen empieza cuando se apagan las luces',
      text: 'Tres salas, sonido de estudio y una cabina que no descansa. Jazz eléctrico, techno en vivo y sesiones que terminan con el amanecer.',
      primary: 'Comprar entradas',
      secondary: 'Ver agenda',
    },
    gallery: {
      title: 'Próximas noches',
      items: [
        { title: 'Ultravioleta Trío', meta: 'Vie 23:00 · Sala A', tag: 'Jazz eléctrico' },
        { title: 'Pulso Norte · live set', meta: 'Sáb 01:30 · Sala B', tag: 'Techno' },
        { title: 'Sesión de amanecer', meta: 'Dom 05:00 · Terraza', tag: 'Ambient' },
      ],
    },
    detail: {
      eyebrow: 'Noche destacada',
      title: 'Neón en la sala grande',
      text: 'Cuatro horas de sintetizadores analógicos, visuales en directo y un sistema de sonido afinado para que lo sientas en el pecho.',
      facts: [
        ['Puertas', '22:00'],
        ['Aforo', '480 personas'],
        ['Edad', '+18'],
      ],
      primary: 'Reservar mesa',
      secondary: 'Añadir al calendario',
    },
    contact: {
      title: 'Lista de invitados',
      text: 'Reservas de grupo, prensa o booking de artistas.',
      namePlaceholder: 'Mateo Ríos',
      emailPlaceholder: 'mateo@correo.com',
      messagePlaceholder: 'Somos 8 para el viernes…',
      submit: 'Enviar solicitud',
      statesTitle: 'Estados del sistema',
    },
    states: {
      success: 'Estás en la lista. Muestra tu correo en la puerta.',
      error: 'Algo falló al enviar. Revisa el correo e inténtalo otra vez.',
      warning: 'Quedan menos de 20 entradas para el viernes.',
    },
    footer: 'Nocturne · club ficticio creado para esta demo',
  },
};
