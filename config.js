/**
 * Configuracion de la demo de Wompi Checkout.
 *
 * Se carga con <script src="config.js"> (no con fetch), para que la pagina
 * funcione tanto abriendo el index.html directo (file://) como en GitHub Pages.
 *
 * Solo contiene llaves PUBLICAS de Wompi (pub_...), que son publicas por diseno.
 * NUNCA agregar aqui llaves privadas ni el secreto de integridad.
 */
window.WOMPI_CONFIG = {
  // --- Acceso ---
  // Clave para entrar a la demo. Es una barrera visual, no seguridad real:
  // al ser una app estatica, la clave es visible en el codigo fuente.
  accessKey: "GF2026",
  // Clave de localStorage donde se marca la sesion como autenticada.
  authStorageKey: "wompi_demo_auth",

  defaultEnvironment: "dev",
  environments: {
    dev: {
      label: "DEV",
      publicKey: "pub_devint_JHVQ9g9LnX51d9tedCRRYrWa1TIht4aT",
      currency: "COP",
      widget: {
        src: "https://checkout.co.dev.wompi.dev/widget.js",
        amountInCents: 495000
      },
      webCheckout: {
        action: "https://checkout.co.dev.wompi.dev/p/",
        amountInCents: 150000
      },
      customerData: {
        email: "lola@perez.com",
        fullName: "Lola Perez",
        phoneNumber: "3019777777",
        phoneNumberPrefix: "+57",
        legalId: "123456789",
        legalIdType: "CC"
      }
    },
    uat: {
      label: "UAT",
      publicKey: "pub_stagint_rZ5MqoMFYMv0fOqgS2JYVuNyBlGWEzdh",
      currency: "COP",
      widget: {
        src: "https://checkout.co.uat.wompi.dev/widget.js",
        amountInCents: 495000
      },
      webCheckout: {
        action: "https://checkout.co.uat.wompi.dev/p/",
        amountInCents: 150000
      },
      customerData: {
        email: "lola@perez.com",
        fullName: "Lola Perez",
        phoneNumber: "3019777777",
        phoneNumberPrefix: "+57",
        legalId: "123456789",
        legalIdType: "CC"
      }
    }
  }
};
