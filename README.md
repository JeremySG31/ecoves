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

### 1. **Creación de la Sección "Involúcrate" con Contenido Animado**
*   **Objetivo:** Crear una sección visualmente atractiva que motive a los usuarios a participar activamente.
*   **Acciones:**
    *   Diseñar e implementar una nueva sección que alterne bloques de texto e imagen.
    *   Cada bloque contendrá un texto inspirador sobre la acción comunitaria y una imagen representativa (proporcionadas por el usuario).
    *   El primer bloque mostrará la imagen a la derecha y el texto a la izquierda.
    *   El segundo bloque invertirá el orden, con la imagen a la izquierda y el texto a la derecha.
    *   Ambos bloques utilizarán el componente `AnimatedElement` para aparecer con animaciones de deslizamiento (`slideInLeft` y `slideInRight`) al hacer scroll.

### 2. **Creación de la Sección "Principios Ecológicos"**
*   **Objetivo:** Educar a los usuarios sobre las "3R" (Reducir, Reutilizar, Reciclar) de una manera visualmente atractiva.
*   **Acciones:**
    *   Diseñar e implementar una nueva sección en la página principal.
    *   La sección contendrá tres tarjetas, una para cada principio.
    *   Cada tarjeta incluirá un icono representativo, un título y un texto descriptivo.

### 3. **Actualización de Eventos con Énfasis en la Municipalidad de VES**
*   **Objetivo:** Aumentar la relevancia y credibilidad de los eventos mostrados.
*   **Acciones:**
    *   Se modificará el array de eventos para incluir títulos y descripciones que hagan referencia a programas y lugares específicos de VES.

### 4. **Creación del Cuadro de Degradación de Residuos**
*   **Objetivo:** Educar sobre el impacto a largo plazo de la basura.
*   **Acciones:**
    *   Diseñar una sección que muestre el tiempo de degradación de varios objetos comunes con ilustraciones y animaciones.

### 5. **Implementación de Animaciones "On-Scroll"**
*   **Objetivo:** Mejorar la experiencia de usuario añadiendo interactividad y dinamismo.
*   **Acciones:**
    *   Se creará un componente reutilizable (`AnimatedElement`) que, usando `useIntersectionObserver`, aplicará animaciones CSS a los elementos cuando entren en el viewport del usuario.
