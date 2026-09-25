# Wompi Checkout Demo

Interfaz única y estática para probar los dos métodos de integración de pagos de
[Wompi](https://docs.wompi.co/docs/colombia/widget-checkout-web/):

- **Widget** — el pago se completa dentro de la misma página (modal / iframe).
- **Web Checkout** — redirige al checkout de Wompi mediante un formulario `GET`
  (se abre en una pestaña nueva).
- **Link de pago** — abre una URL de link de pago fija por ambiente en una pestaña
  nueva; el usuario llena todos los datos en el checkout (sin datos precargados).

No requiere backend ni proceso de build: es HTML + JavaScript + un `config.js`.
Funciona abriendo el `index.html` directamente (doble clic, `file://`) y también
publicado en **GitHub Pages**.

## Características

- Selector de ambiente por radio buttons: **DEV**, **UAT** y **CUSTOM** (DEV por defecto).
- URLs y llaves públicas independientes por ambiente, definidas en `config.js`.
- Modo **CUSTOM**: permite editar todos los atributos en caliente (se precarga con
  el ambiente activo).
- **Reference dinámico** generado al hacer click, con el formato
  `REF-GF-{{YYYYMMDD-HHMMSS}}`.
- **Datos del pagador** (`customer-data`) precargados y editables: email, nombre,
  teléfono + prefijo, tipo y número de documento. Solo se envían los campos con valor.
- El Web Checkout se abre en una **pestaña nueva** (`target="_blank"`).

## Estructura

```
web_checkout/
├── login.html        # Pantalla de acceso (pide la clave antes de entrar)
├── index.html        # Interfaz única (UI + logica)
├── config.js         # "Archivo de configuracion" por ambiente (define window.WOMPI_CONFIG)
├── widget.html       # Ejemplo original del widget (referencia)
├── web_checkout.html # Ejemplo original del web checkout (referencia)
└── README.md
```

## Configuración

Toda la configuración vive en `config.js`, que define `window.WOMPI_CONFIG`. No hay
que tocar el HTML para cambiar ambientes o valores.

```js
window.WOMPI_CONFIG = {
  defaultEnvironment: "dev",
  environments: {
    dev: {
      label: "DEV",
      publicKey: "pub_devint_...",
      currency: "COP",
      widget:      { src: "https://checkout.co.dev.wompi.dev/widget.js", amountInCents: 495000 },
      webCheckout: { action: "https://checkout.co.dev.wompi.dev/p/",    amountInCents: 150000 },
      customerData: {
        email: "lola@perez.com",
        fullName: "Lola Perez",
        phoneNumber: "3019777777",
        phoneNumberPrefix: "+57",
        legalId: "123456789",
        legalIdType: "CC"
      }
    },
    uat: { /* misma estructura con URLs y llave de UAT */ }
  }
};
```

| Campo | Descripción |
|-------|-------------|
| `defaultEnvironment` | Ambiente seleccionado al cargar (`dev` / `uat`). |
| `publicKey` | Llave pública de comercio (Wompi). Es pública por diseño. |
| `currency` | Moneda. Actualmente Wompi solo soporta `COP`. |
| `widget.src` | URL del `widget.js` del ambiente. |
| `widget.amountInCents` / `webCheckout.amountInCents` | Monto en centavos. |
| `webCheckout.action` | URL del checkout web (`/p/`) del ambiente. |
| `paymentLink.url` | URL del link de pago (`/l/...`) del ambiente. |
| `customerData.*` | Datos del pagador que se prellenan en el checkout. |

## Uso local

`config.js` se carga con una etiqueta `<script>`, así que puedes **abrir el
`index.html` directamente** (doble clic o `file://`), sin servidor.

Si prefieres servirlo por HTTP (por ejemplo para replicar el entorno de Pages):

```bash
# Desde la carpeta web_checkout
python3 -m http.server 8080
# Abrir: http://127.0.0.1:8080/index.html
```

O con Node:

```bash
npx serve .
```

## Despliegue en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de un repositorio **público**.
2. En el repo: **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**.
4. Selecciona la rama (`main`) y carpeta `/ (root)`, y guarda.
5. La URL quedará como `https://<usuario>.github.io/<repo>/`.

Como el `index.html` usa rutas relativas (`config.js`), funciona aunque Pages
publique bajo un subpath.

## Acceso

La app abre en `login.html` y pide una clave antes de mostrar las opciones de pago.

- La clave se define en `config.js` (`accessKey`).
- Al validar, se guarda un flag en `localStorage` y se redirige a `index.html`.
- El acceso **no expira** (persiste hasta borrar los datos del navegador).
- `index.html` verifica el flag al cargar; si no existe, vuelve a `login.html`.

> Nota: al ser una app estática, la clave es visible en el código fuente. Es una
> barrera visual para evitar accesos casuales, **no** un control de seguridad real.

## Seguridad

- Las **llaves públicas** de Wompi (`pub_...`) son públicas por diseño; es seguro
  versionarlas en `config.js`.
- **Nunca** subas llaves privadas ni el secreto de integridad (`signature:integrity`).
  La firma de integridad debe generarse en un backend, nunca en el frontend.
- El `.gitignore` bloquea archivos `.env`, `*.secret` y `*-private.json` por precaución.

## Referencia

- [Documentación oficial de Wompi — Widget & Checkout Web](https://docs.wompi.co/docs/colombia/widget-checkout-web/)
