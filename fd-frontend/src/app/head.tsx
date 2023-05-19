import logo from "../asset/favicon.ico";

export default function Head(): React.ReactElement {
  return (
    <>
      <title>Fast Delivery</title>
      <meta name="description" content="App de distribución de paquetes." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href={logo.src} />
    </>
  );
}
