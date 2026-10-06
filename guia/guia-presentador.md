# Guía del presentador — Design Tokens y multitenancy visual

> **Tesis (dila al inicio, demuéstrala a la mitad, repítela al cierre):**
> *Si tu componente dice "rosa", solo sirve para un cliente. Si dice "acento", sirve para todos.*

## Antes de empezar (checklist)

- [ ] `cd demo && npm install && npm run dev` corriendo en una pestaña.
- [ ] `slides/index.html` abierto en otra pestaña (pantalla completa con `f`).
- [ ] La galería real abierta en otra pestaña, con el select de tema a la mano.
- [ ] Demo en **Casa Aurora** y todas las casillas de demo desactivadas.
- [ ] Slides en **Molino Central** (tema por defecto).
- [ ] Zoom del navegador listo para que el código se lea desde la última fila.

### Atajos (no se muestran en pantalla)

| Dónde | Tecla | Acción |
|---|---|---|
| Slides | `→` / `←` | Avanzar / retroceder |
| Slides | `t` | Cambiar el tema de las propias slides |
| Slides | `n` | Mostrar notas |
| Slides | `f` | Pantalla completa |
| Slides | `?` | Ayuda de teclado |
| Demo | `t` (fuera de un campo) | Cambiar de tenant |

## Reparto de tiempo (40 min)

| Bloque | Slides | Demo | Min |
|---|---|---|---|
| 1. Gancho + demo inicial | 1–4 | Demo 1 | 5 |
| 2. Tokens y roles semánticos | 5–9 | Demo 2 | 10 |
| 3. Implementación real (mi caso, romperlo, el resultado) | 10–13 | Demos 4 y 5, galería real | 10 |
| 4. Límites y cierre | 14–15 | — | 5 |
| Q&A | 16 | según preguntas | resto (~10 min) |

> Si vas tarde, recorta del bloque 2 (Familias puede ir más rápido), **nunca** del bloque 3: el caso real con sus errores es lo que más valor tiene.

---

## Parte A — Notas por slide

### Bloque 1 · Gancho (5 min)

**1 · Portada**
- Di la tesis en voz alta, despacio. No la expliques todavía.
- "Al final de esta plática quiero que esa frase les parezca obvia."

**2 · Gancho**
- Dos reposterías: un estudio artesanal y una panificadora industrial. **Mismo negocio, mismas secciones.**
- Pregunta: **"¿Cuánto código diferente hay entre ellos?"**. Deja que respondan.

**3 · Revelación**
- "Cero." Pausa.
- 👉 **Salta a la demo (Demo 1):** cambia de tenant con el switcher o con `t`. Hazlo dos o tres veces sin hablar.
- Vuelve a las slides: "Lo único que cambió fue un archivo de datos. Ni el menú ni las secciones."

**4 · El dolor**
- Lee el `if (tenant === 'aurora')` en voz alta. Que se sienta feo.
- Pregunta: **"¿Y el cliente 12?"**. Cada componente conoce a cada tenant: componentes × tenants.
- Opcional: en la demo, activa **Demo 3 · Antipatrón** y marca *Cliente 12*: el botón cae en un gris sin estilo. "Funciona... hasta que no."

### Bloque 2 · Tokens y roles (10 min)

**5 · ¿Qué son los tokens?**
- "Un token es una decisión de diseño guardada como dato." Color, tipografía, radio, sombra.

**6 · Dos formas de nombrar** ⭐ *aquí está el 80 % del valor*
- Primitivo: `--rosa-300` dice **qué es**. Semántico: `--accent` dice **para qué sirve**.
- Lee las dos definiciones de la slide:
  - `--accent`: el color que dice "aquí actúa".
  - `--text-muted`: el texto secundario, el que pesa menos.
- Pulsa `t`: los primitivos no cambian, los roles sí.

**7 · Por qué importa el nombre**
- Lee la analogía: "Un guion dice «entra el protagonista», no «entra Brad Pitt». El componente es el guion; el tema es el elenco."
- Señala las dos tarjetas: pedir **un color** ("dame rosa") solo sirve para un cliente; pedir **un rol** ("dame el color de acción") sirve para todos.
- Señala las dos zonas: arriba **NO CAMBIA** (el componente), abajo **SÍ CAMBIA** (el tema). Pulsa `t`: solo se mueve la mitad de abajo.
- 👉 **Salta a la demo (Demo 2 · Editor de tokens):** cambia `accent`. Todo lo que es acento se repinta, incluido el botón, aunque nadie tocó su token propio `btn-bg` (un token de componente que apunta a `accent`): es el remate de la slide 7. **Este es el momento memorable: hazlo lento.**

**8 · Familias de roles** ⭐ *slide central*
- Recorre las cinco familias con calma: superficies, contenido, acento, bordes, estados.
- Para cada una, señala el ejemplo de UI: "esto ya lo han visto mil veces, solo que sin nombre".
- Pulsa `t` aquí también: las muestras cambian, los nombres no.
- "Las superficies no son un tema aparte: son **una familia** de roles." (Prepara el bloque 3.)

**9 · Checkpoint**
- "¿Alguien ya pensó en un caso de uso en sus proyectos, o ya tiene algo así?" Manos arriba, cuenta en voz alta y sigue (≈30 s).
- ⚠️ **No abras Q&A aquí.** Si alguien pregunta: "Excelente, guárdala para el final."

### Bloque 3 · Implementación real (10 min)

**10 · Mi caso: empecé con superficies**
- Cuéntalo como camino, no como lección: un sistema de galerías de fotos y photobooth para eventos donde un tema tenía que cambiar todos los colores sin tocar la estructura.
- "Empecé nombrando superficies por necesidad. No sabía que eso ya era un subconjunto de los tokens semánticos."

**11 · Qué se rompió**
- Para cada error, demuéstralo:
  - **Hex hardcodeado** → 👉 activa **Demo 4** y cambia a Molino Central: el banner se queda rosa pastel. "Esa pieza vive en el tenant equivocado."
  - **Superficie sin su pareja** → 👉 activa **Demo 5** y cambia a Molino Central: el texto desaparece. "El fondo y el texto se eligen **en pareja**."

**12 · Por eso llegué a los roles**
- Las dos reglas que salieron de los errores:
  1. Cada fondo viaja con su color de texto (`surface` → `on-surface`).
  2. El "rosa" solo se escribe en el tema. Los componentes solo dicen "acento". (Es la tesis otra vez: que se note.)

**13 · Así se ve en producción** *(el resultado)*
- "Este es el resultado de todo lo anterior."
- Recorre los números del mockup: fondo → `surface`, tarjeta → `surface-elevated`, "Reservar mi fecha" → `accent`, "Compartir" → token de componente.
- Señala lo que **no** es token: la foto, el logo del evento y los íconos de redes (usan el color de cada red, no el del tema).
- 👉 **Abre la galería real y cambia el tema con el select.** "Esto fue un cambio de datos. No hubo deploy."

### Bloque 4 · Límites y cierre (5 min)

**14 · Límites**
- Un tema alcanza para **identidad visual**. No alcanza para estructura distinta, flujos distintos ni funcionalidades por cliente (eso es configuración / feature flags).
- Lee la línea honesta: *"Esto resuelve la identidad visual por cliente; separar los datos de cada cliente es otro problema."*
- ⚠️ **En ningún momento afirmes que existe multitenancy completo.**

**15 · Cierre**
- Repite la tesis. Ahora debería sonar obvia.
- Pregunta abierta: **"¿Cuántos hex hardcodeados hay hoy en tu proyecto?"** Deja que piensen 5 segundos.

**16 · Preguntas**
- Muestra el repo: `github.com/hitzu/expo-design-with-tokens` y el comando para correrlo.
- Usa el banco de abajo.

---

## Parte B — Banco de preguntas

> **Si no sabes la respuesta:** dilo ("no lo he resuelto / no lo sé") y devuelve la pregunta a la sala: "¿Alguien lo ha resuelto?". Suele generar la mejor conversación de la plática.

### Sobre el concepto

**¿Esto no son las variables CSS de toda la vida?**
Las variables CSS son el *mecanismo*; los tokens son la *convención*. `--color-1` es una variable; `--accent` es un token con rol. Lo valioso no es `var()`, es el nombre y las capas.

**¿Cuántos tokens son demasiados? ¿Dónde está el límite?**
Cuando nadie sabe cuál usar. Señal de alarma: tokens semánticos con un solo consumidor o nombres de componente disfrazados de rol. Empieza con las familias (~15–30 roles) y agrega tokens de componente solo cuando un componente necesita desviarse del rol.

**¿Modo oscuro es lo mismo que un tenant distinto?**
Mecánicamente sí: otro juego de valores para los mismos roles. Conceptualmente son ejes distintos y pueden combinarse (tenant × modo). Si tus roles están bien nombrados, el modo oscuro sale casi gratis.

**¿No es over-engineering si solo tengo dos clientes?**
El costo de nombrar por rol es casi cero al escribir el componente; el costo de migrar hex hardcodeados después es alto. Además, el modo oscuro ya es un "segundo cliente". Lo que sí sería over-engineering: un pipeline completo de Style Dictionary para dos temas.

### Sobre implementación

**¿Por qué no Tailwind con config por tenant?**
Se puede, y combina bien: configura Tailwind para que sus colores apunten a variables CSS (`accent: 'var(--accent)'`) y usa clases como `bg-accent`. Lo que no escala es `bg-pink-300` en el componente: es nombrar por valor otra vez. Una config de Tailwind por tenant en build time implica un build por tenant.

**¿Dónde viven los temas: JSON, base de datos, archivos?**
Depende de quién los edita. Equipo de desarrollo → archivos en el repo (versionados, revisables). Staff o clientes los editan → base de datos, con validación del esquema y del contraste antes de guardar. Así funciona la galería real: el tema es un dato del evento, por eso cambia sin deploy.

**¿Cómo evitas el parpadeo de tema incorrecto al cargar (SSR / hidratación)?**
El tema se tiene que resolver **antes del primer pintado**: en SSR, renderiza el `data-theme` y las variables en el HTML del servidor; sin SSR, un script inline bloqueante en el `<head>` que aplique el tema antes de que cargue la app. Nunca lo apliques en un `useEffect`.

**¿Cómo manejas tipografías y logos por tenant?**
Tipografía: tokens (`font-heading`, `heading-weight`, `heading-transform`), como en la demo. Logos e imágenes son **contenido** del tenant, no tokens: viven en la configuración del tenant, no en la paleta.

**¿Cómo migro un proyecto existente lleno de hex hardcodeados?**
1. Inventario: `grep` de hex/rgb en el código, agrupa por valor.
2. Asigna rol a cada uso (el mismo hex puede ser dos roles distintos).
3. Define el tema actual como primer tema; reemplaza componente por componente sin cambio visual.
4. Agrega un lint (p. ej. stylelint `color-no-hex`) para que no vuelvan a entrar.

**¿Herramientas?**
- **Style Dictionary:** transforma tokens a CSS, iOS, Android desde una sola fuente.
- **Tokens Studio:** puente con Figma.
- **Material Design 3:** buena referencia de nomenclatura de roles (`surface`, `on-surface`, `primary`, `on-primary`).
- Formato estándar en curso: la especificación del W3C Design Tokens Community Group.

### Sobre calidad

**¿Cómo garantizas contraste y accesibilidad en todos los temas?**
Por **parejas**: cada `surface-*` con su `on-surface`, cada `accent` con su `on-accent`. Así se puede calcular el contraste de cada pareja en cada tema (WCAG AA: 4.5:1 texto normal, 3:1 texto grande y foco) antes de guardar un tema nuevo; si una pareja no pasa, no se guarda.

**¿Y si no eres diseñador, cómo eliges los colores?** *(respuesta de respaldo; no está en las slides)*
Parto del color de la marca y saco los demás con relaciones de la rueda de color (análogos, complementario, tonos más claros y oscuros del mismo color). Me apoyo en IA para proponer la paleta completa por rol, y el contraste de cada pareja es el filtro objetivo: si no pasa, no importa qué tan bonito se vea. Respuesta corta; no abras la conversación sobre IA.

**¿Cómo testeas que ningún tema se rompa?**
Regresión visual **por tema**, no solo el default (Playwright, Chromatic, Percy: la misma página × cada tema). Más un test de contrato: todos los temas definen todos los roles.

### Sobre multitenancy

**¿Y si un tenant quiere cambiar la estructura, no solo los colores?**
Ahí se acabó el tema (slide 14). Opciones, de menor a mayor costo: variantes de componente controladas por configuración, slots/composición por tenant, y en el extremo, páginas distintas. Mantén la regla: los colores siguen viniendo de roles aunque la estructura varíe.

**¿Cómo resuelves qué tenant es? ¿Subdominio o path?** *(fuera de lo implementado)*
Honesto: **no lo tengo construido**. Trade-offs conocidos:

| Estrategia | A favor | En contra |
|---|---|---|
| Subdominio (`aurora.app.com`) | Aislamiento claro, cookies separadas | DNS/certificados wildcard, más infraestructura |
| Path (`app.com/aurora`) | Simple, un solo dominio | Rutas y cookies compartidas, cuidado con los enlaces |
| Header / dominio propio | Marca blanca real | Mapeo dominio → tenant y gestión de certificados |

**¿Cómo aíslas los datos entre tenants?** *(fuera de lo implementado)*
Honesto: **no está construido**; la plática es sobre la capa visual. Trade-offs conocidos:

| Modelo | A favor | En contra |
|---|---|---|
| Tabla compartida con `tenant_id` | Barato, fácil de operar y migrar | Una consulta sin filtro filtra datos de otro cliente; mitígalo con row-level security |
| Schema por tenant | Buen aislamiento, misma BD | Migraciones × N schemas, límite práctico de schemas |
| Base de datos por tenant | Aislamiento máximo, cumplimiento normativo | Costo y operación más altos, conexiones × N |

Cierra con: "Elegiría según el riesgo y el número de clientes. ¿Alguien aquí opera alguno de estos modelos?"
