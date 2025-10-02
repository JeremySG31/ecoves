# ECOVES: Plataforma de Acción Ambiental para Villa El Salvador

## Visión General

ECOVES es una aplicación web progresiva diseñada para ser el centro neurálgico de la acción ambiental en Villa El Salvador (VES). Su propósito es empoderar a los residentes para que se conviertan en agentes de cambio, proporcionando herramientas para reportar problemas, participar en iniciativas locales y educarse sobre prácticas sostenibles. La plataforma busca fomentar una comunidad conectada y comprometida con la preservación y mejora de su entorno.

## Diseño y Características Implementadas

La aplicación se ha construido siguiendo principios de diseño moderno, priorizando la experiencia del usuario, la accesibilidad y el impacto visual.

*   **Tema Oscuro y Claro:** Interfaz adaptable con un selector de tema para comodidad visual del usuario.
*   **Diseño Responsivo:** Experiencia de usuario consistente y funcional en dispositivos móviles y de escritorio.
*   **Componentes Interactivos:**
    *   **Carrusel Hero:** Un carrusel dinámico en la cabecera que presenta los pilares de la plataforma: Reportar, Conectar y Actuar.
    *   **Contadores de Impacto:** Métricas animadas que muestran en tiempo real la contribución de la comunidad (reportes, veces compartido, participantes).
    *   **Tarjetas de Iniciativas:** Una cuadrícula visual para mostrar noticias y proyectos locales.
    *   **Formulario de Reporte:** Una herramienta clara y directa para que los usuarios envíen denuncias ambientales de forma anónima.
    *   **Agenda de Eventos:** Tarjetas informativas para que los usuarios descubran y se inscriban en eventos comunitarios.
    *   **Modal para Compartir:** Facilita la difusión de la plataforma a través de un enlace y un código QR.
*   **Contenido Enfocado en VES:**
    *   El lenguaje y los ejemplos están adaptados a la realidad de Villa El Salvador.
    *   El título principal y los textos reflejan el enfoque en el distrito ("ECOVES", "Hecho con ❤️ para Villa El Salvador").

## Plan de Implementación Actual

El objetivo de esta fase es enriquecer la plataforma con contenido educativo, mejorar la relevancia de los eventos y aumentar el dinamismo de la interfaz.

### 1. **Creación de la Sección "Principios Ecológicos"**
*   **Objetivo:** Educar a los usuarios sobre las "3R" (Reducir, Reutilizar, Reciclar) de una manera visualmente atractiva.
*   **Acciones:**
    *   Diseñar e implementar una nueva sección en la página principal.
    *   La sección contendrá tres tarjetas, una para cada principio.
    *   Cada tarjeta incluirá:
        *   Un icono representativo (Ej: Papelera para Reducir, Símbolo de reciclaje para Reciclar).
        *   Un título claro: "Reduce", "Reutiliza", "Recicla".
        *   Un texto descriptivo con consejos prácticos y aplicables al contexto de VES.

### 2. **Actualización de Eventos con Énfasis en la Municipalidad de VES**
*   **Objetivo:** Aumentar la relevancia y credibilidad de los eventos mostrados, simulando una colaboración o iniciativa municipal.
*   **Acciones:**
    *   Se modificará el array `events` en el componente `HomePageClient`.
    *   Los nuevos eventos incluirán títulos y descripciones que hagan referencia a programas y lugares específicos de VES.

### 3. **Creación del Cuadro de Degradación de Residuos**
*   **Objetivo:** Crear un impacto visual que eduque sobre la longevidad de los distintos tipos de basura.
*   **Acciones:**
    *   Diseñar una nueva sección que muestre una línea de tiempo o una comparación directa del tiempo de degradación de varios objetos comunes (cáscara de plátano, bolsa de plástico, botella de vidrio, etc.).
    *   Cada elemento del cuadro contendrá una ilustración o icono, el nombre del residuo y su tiempo estimado de descomposición.

### 4. **Implementación de Animaciones "On-Scroll"**
*   **Objetivo:** Mejorar la experiencia de usuario añadiendo interactividad y dinamismo a través de la página.
*   **Acciones:**
    *   Se creará un componente reutilizable (`AnimatedElement`) que utilice el hook `useIntersectionObserver`.
    *   Este componente envolverá las imágenes, tarjetas y otros elementos que deban aparecer dinámicamente.
    *   Se definirán animaciones CSS genéricas (ej: `fadeInUp`, `slideInLeft`) que se aplicarán a los elementos cuando entren en el viewport del usuario, creando una experiencia de navegación fluida y moderna.
