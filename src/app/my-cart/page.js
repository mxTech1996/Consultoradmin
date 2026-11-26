"use client";
import { useContext, useState } from "react";
import { CartContext } from "ui-old-version";
import { useRouter } from "next/navigation";
import { ApiTransaction } from "../api/api";
import { FaChevronLeft } from "react-icons/fa";
import { LockKeyhole, Minus, Plus, Trash2 } from "lucide-react";
import {
  convertCurrencyAmount,
  formatCurrencyAmount,
  getCurrencyForLanguage,
  MXN_PER_USD,
} from "../../lib/pricing";
import { dataSite } from "../../lib/data";
import { productSpanish, useLanguage } from "../../lib/language";

const pageName = "Consultoradmin";
// Preserves the legacy discount behaviour: both real codes apply the same
// 10% discount (see Auxida/SAEMLE src/components/organisms/CartSection.js:
// totalDiscount: 10).
const validDiscountCode = ["ADMIN10", "ADMIN20"];
const DISCOUNT_PERCENT = 10;

const CartSectionComponent = () => {
  const {
    products,
    getQuantityProductCart,
    sumProductItemCart,
    substProductItemCart,
    handleAddOrRemoveProduct,
    cleanCartItems,
  } = useContext(CartContext);
  const { language } = useLanguage();
  const currency = getCurrencyForLanguage(language);
  const t = (english, spanish) => (language === "es" ? spanish : english);
  const [step, setStep] = useState("cart"); // cart | payment
  const [isValidDiscount, setIsValidDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [isPaymentLinkFormOpen, setIsPaymentLinkFormOpen] = useState(false);
  const [isRequestingPaymentLink, setIsRequestingPaymentLink] = useState(false);
  const [paymentLinkRequestStatus, setPaymentLinkRequestStatus] = useState("");
  const router = useRouter();

  const createRandomNumberTransaction = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  const extractMessage = (str) => {
    if (!str || str === "" || str === "null" || str === undefined) {
      return t(
        "An unexpected error occurred. Please try again later.",
        "Ocurrió un error inesperado. Inténtalo de nuevo más tarde.",
      );
    }
    const match = str.match(/message:\s*(.+)/);
    if (match) {
      return match[1];
    } else {
      return str;
    }
  };

  const sendEmail = async (
    email = "",
    phone = "",
    interProducts = [],
    idTransaction = "",
    nameCard = "",
  ) => {
    const services = interProducts?.map((item) => {
      return {
        name: item.name,
        price: Number(
          convertCurrencyAmount(item.price, "USD", "MXN").toFixed(2),
        ),
      };
    });
    const data = {
      email_for_admin_data: {
        client: pageName,
        email: email,
        name: nameCard,
        amount: Number(totalMXN.toFixed(2)),
        phone_number: "+52" + phone,
        services: services,
        order_number: idTransaction,
        sender: dataSite.email,
      },
      email_for_client_data: {
        email: email,
      },
    };
    await ApiTransaction.sendEmail(data);
  };

  const cartTotalUsd = products.reduce(
    (subtotal, product) =>
      subtotal + Number(product.price) * getQuantityProductCart(product.id),
    0,
  );
  const cartTotalMXN = convertCurrencyAmount(cartTotalUsd, "USD", "MXN");
  const totalMXN = isValidDiscount ? 10 : cartTotalMXN;
  const total = convertCurrencyAmount(totalMXN, "MXN", currency);
  const formatCurrency = (amount, selectedCurrency = currency) =>
    formatCurrencyAmount(amount, selectedCurrency, language);

  const onPaymentResult = async (data) => {
    setIsLoading(true);
    const merchantTransaction =
      pageName + "-" + createRandomNumberTransaction();

    let body = {
      merchant_transaction_id: merchantTransaction,
      card: {
        number: data.cardNumber,
        holder_name: data.cardName,
        expiration_year: data.cardDate.slice(-2),
        expiration_month: data.cardDate.substring(0, 2),
        cvv: data.cardCvv,
      },
      customer: {
        merchant_customer_id: "331415",
        first_name: data.firstname,
        second_name: "",
        first_surname: data.lastname,
        second_surname: data.secondSurname,
        email: data.email,
        phone_number: "+52" + data.phone,
        home_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: "",
          city: data.city,
          state_code: data.state?.slice(0, 2).toUpperCase(),
          state_name: data.state,
          country_code: "MX",
          country_name: "Mexico",
        },
        billing_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: "",
          city: data.city,
          state_code: data.state?.slice(0, 2).toUpperCase(),
          state_name: data.state,
          country_code: "MX",
          country_name: "Mexico",
        },
        nationality: "MX",
        gender: "male",
      },
      amount: totalMXN.toFixed(2),
      currency: "MXN",
      description: "Pago de servicios legales Consultoradmin",
    };
    try {
      const dataRes = await ApiTransaction.makeTransaction(body);

      if (dataRes?.content?.status !== "success") {
        return {
          success: false,
          message: extractMessage(dataRes?.content?.message?.detail),
        };
      }

      const idTransaction = dataRes?.content?.merchant_transaction_id;
      cleanCartItems();
      await sendEmail(
        data.email,
        data.phone,
        products,
        idTransaction,
        data.cardName,
      );
      return {
        success: true,
        data: {
          transactionId: idTransaction,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: extractMessage(error?.message),
      };
    } finally {
      setIsLoading(false);
    }
  };
  const onChangeDiscount = (value) => {
    setDiscountCode(value);
    setIsValidDiscount(validDiscountCode.includes(value.trim().toUpperCase()));
  };
  const onSubmitPayment = async (event) => {
    event.preventDefault();
    setPaymentError("");
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.cardNumber = String(data.cardNumber).replace(/\s/g, "");

    const result = await onPaymentResult(data);
    if (result.success) {
      setTransactionId(result.data.transactionId);
    } else {
      setPaymentError(result.message);
    }
  };
  const onRequestPaymentLink = async (event) => {
    event.preventDefault();
    setPaymentLinkRequestStatus("");
    setIsRequestingPaymentLink(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("requestName") || "").trim();
    const email = String(formData.get("requestEmail") || "").trim();
    const services = products.map((product) => {
      const quantity = getQuantityProductCart(product.id);
      const localizedProduct =
        language === "es" ? productSpanish[product.id] : undefined;

      return {
        name: `${localizedProduct?.name ?? product.name} x${quantity}`,
        price: Number(
          convertCurrencyAmount(
            Number(product.price) * quantity,
            "USD",
            "MXN",
          ).toFixed(2),
        ),
      };
    });

    try {
      const response = await ApiTransaction.sendEmail({
        email_for_admin_data: {
          client: pageName,
          email,
          name,
          amount: Number(totalMXN.toFixed(2)),
          phone_number: "",
          services,
          order_number: t("Payment link request", "Solicitud de link de pago"),
          sender: dataSite.email,
        },
        email_for_client_data: { email },
      });

      if (
        !response ||
        response?.isAxiosError ||
        response?.status === "error" ||
        response?.content?.status === "error"
      ) {
        throw new Error("Unable to send payment link request");
      }

      setPaymentLinkRequestStatus(
        t(
          `Request sent to ${dataSite.email}.`,
          `Solicitud enviada a ${dataSite.email}.`,
        ),
      );
      form.reset();
    } catch {
      setPaymentLinkRequestStatus(
        t(
          "We couldn't send your request. Please try again.",
          "No pudimos enviar tu solicitud. Inténtalo de nuevo.",
        ),
      );
    } finally {
      setIsRequestingPaymentLink(false);
    }
  };
  return (
    <main className="mt-6 w-full pb-20">
      <div className="mx-auto w-full max-w-6xl [padding-inline:1rem] sm:[padding-inline:1.5rem]">
        <button
          type="button"
          onClick={() => {
            if (step === "payment") {
              setStep("cart");
              return;
            }
            router.push("/#products");
          }}
          className="mb-8 inline-flex min-h-10 items-center gap-2 font-mono text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <FaChevronLeft aria-hidden="true" />
          {step === "payment"
            ? t("Back to cart", "Volver al carrito")
            : t("Back to shop", "Volver a la tienda")}
        </button>

        {step === "cart" && (
          <section>
            <header className="mb-8 border-b border-border pb-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {t("Consultoradmin / Checkout", "Consultoradmin / Compra")}
              </p>
              <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                {t("Shopping cart", "Carrito de compras")}
              </h1>
            </header>

            {products.length === 0 ? (
              <div className="border border-border py-12 text-center">
                <p className="font-display text-2xl text-foreground">
                  {t("Your cart is empty", "Tu carrito está vacío")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("Add an item to continue.", "Agrega un producto para continuar.")}
                </p>
              </div>
            ) : (
              <div className="border border-border">
                <div className="[display:none] grid-cols-[minmax(0,1fr)_180px_170px] gap-4 border-b border-border px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
                  <span>{t("Product", "Producto")}</span>
                  <span>{t("Quantity", "Cantidad")}</span>
                  <span className="text-right">{t("Total", "Total")}</span>
                </div>
                {products.map((product) => {
                  const quantity = getQuantityProductCart(product.id);
                  const localizedProduct =
                    language === "es" ? productSpanish[product.id] : undefined;

                  return (
                    <div
                      key={product.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 border-t border-border px-6 py-5 sm:grid-cols-[minmax(0,1fr)_180px_170px] sm:items-center"
                    >
                      <div className="col-span-2 flex min-w-0 items-center gap-4 sm:col-span-1">
                        {product.image && (
                          <img
                            src={product.image}
                            alt=""
                            className="h-20 w-20 shrink-0 object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <h2 className="font-medium text-foreground">
                            {localizedProduct?.name ?? product.name}
                          </h2>
                          <p className="mt-1 font-mono text-sm text-muted-foreground">
                            {formatCurrency(
                              convertCurrencyAmount(product.price, "USD", currency),
                            )}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`${t("Remove", "Eliminar")} ${localizedProduct?.name ?? product.name}`}
                          onClick={() => handleAddOrRemoveProduct(product.id)}
                          className="inline-flex h-9 shrink-0 items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          <span>{t("Remove", "Eliminar")}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 sm:justify-center">
                        <span className="text-xs text-muted-foreground sm:hidden">
                          {t("Quantity", "Cantidad")}
                        </span>
                        <div className="inline-flex h-10 shrink-0 border border-border">
                          <button
                            type="button"
                            aria-label={t("Decrease quantity", "Reducir cantidad")}
                            disabled={quantity <= 1}
                            onClick={() => substProductItemCart(product.id)}
                            className="flex h-10 w-10 items-center justify-center border-r border-border text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="flex h-10 w-9 items-center justify-center font-mono text-sm tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={t("Increase quantity", "Aumentar cantidad")}
                            onClick={() => sumProductItemCart(product.id)}
                            className="flex h-10 w-10 items-center justify-center border-l border-border text-foreground transition-colors hover:bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center [justify-content:space-between] font-mono text-sm font-semibold text-foreground sm:[justify-content:flex-end]">
                        <span className="text-xs font-normal text-muted-foreground sm:hidden">
                          {t("Total", "Total")}
                        </span>
                        {formatCurrency(
                          convertCurrencyAmount(
                            Number(product.price) * quantity,
                            "USD",
                            currency,
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="flex [flex-direction:column] items-end gap-4 border-t border-border px-6 py-5 sm:[flex-direction:row] sm:justify-end">
                  <p className="text-sm text-muted-foreground">
                    {t("Total", "Total")}
                    <span className="ml-4 font-display text-2xl text-foreground">
                      {formatCurrency(total)}
                    </span>
                  </p>
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaymentLinkFormOpen((open) => !open);
                        setPaymentLinkRequestStatus("");
                      }}
                      className="min-h-12 w-full border border-accent px-6 text-sm font-semibold text-accent transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
                    >
                      {t("Get payment link", "Obtener link de pago")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("payment")}
                      className="min-h-12 [width:100%] bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:[width:auto]"
                    >
                      {t("Go to pay", "Ir a pagar")}
                    </button>
                  </div>
                </div>
                {isPaymentLinkFormOpen && (
                  <form
                    onSubmit={onRequestPaymentLink}
                    className="grid gap-5 border-t border-border px-6 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end"
                  >
                    <div className="sm:col-span-3">
                      <h2 className="font-display text-xl text-foreground">
                        {t("Request a payment link", "Solicitar un link de pago")}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t(
                          "We'll send your request and cart summary to",
                          "Enviaremos tu solicitud y el resumen del carrito a",
                        )}{" "}
                        <span className="font-medium text-foreground">
                          {dataSite.email}
                        </span>
                        .
                      </p>
                    </div>
                    <label className="block text-sm font-medium text-foreground">
                      {t("Name", "Nombre")}
                      <input
                        name="requestName"
                        autoComplete="name"
                        minLength={2}
                        required
                        className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </label>
                    <label className="block text-sm font-medium text-foreground">
                      {t("Email", "Correo electrónico")}
                      <input
                        name="requestEmail"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isRequestingPaymentLink}
                      className="min-h-11 w-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {isRequestingPaymentLink
                        ? t("Sending...", "Enviando...")
                        : t("Request", "Solicitar")}
                    </button>
                    {paymentLinkRequestStatus && (
                      <p
                        role="status"
                        className="text-sm text-muted-foreground sm:col-span-3"
                      >
                        {paymentLinkRequestStatus}
                      </p>
                    )}
                  </form>
                )}
              </div>
            )}
          </section>
        )}

        {step === "payment" && transactionId && (
          <section className="mx-auto max-w-2xl border border-border py-12 text-center sm:py-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {t("Payment complete", "Pago completado")}
            </p>
            <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              {t("Thank you for your order.", "Gracias por tu compra.")}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Your transaction reference is", "Tu referencia de transacción es")}{" "}
              {transactionId}.
            </p>
            <div className="mx-auto mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => router.push("/#products")}
                className="flex min-h-12 w-full items-center justify-center border border-primary bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t("Buy more", "Seguir comprando")}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="flex min-h-12 w-full items-center justify-center border border-foreground/30 bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t("Go home", "Ir al inicio")}
              </button>
            </div>
          </section>
        )}

        {step === "payment" && !transactionId && (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
            <form onSubmit={onSubmitPayment} className="min-w-0">
              <header className="mb-8 border-b border-border pb-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {t("Consultoradmin / Checkout", "Consultoradmin / Pago")}
                </p>
                <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                  {t("Payment details", "Datos de pago")}
                </h1>
              </header>

              <section className="border-b border-border py-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="font-display text-xl text-foreground">
                    {t("Contact", "Contacto")}
                  </h2>
                  <LockKeyhole className="h-4 w-4 text-accent" aria-hidden="true" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("First name", "Nombre")}
                    <input
                      name="firstname"
                      autoComplete="given-name"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Last name", "Primer apellido")}
                    <input
                      name="lastname"
                      autoComplete="family-name"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground sm:col-span-2">
                    {t("Second surname", "Segundo apellido")}
                    <input
                      name="secondSurname"
                      autoComplete="additional-name"
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Email", "Correo electrónico")}
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Phone", "Teléfono")}
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel-national"
                      inputMode="tel"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                </div>
              </section>

              <section className="border-b border-border py-7">
                <h2 className="mb-5 font-display text-xl text-foreground">
                  {t("Delivery address", "Dirección de entrega")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-muted-foreground sm:col-span-2">
                    {t("Street", "Calle")}
                    <input
                      name="street"
                      autoComplete="address-line1"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Exterior number", "Número exterior")}
                    <input
                      name="extNumber"
                      autoComplete="address-line2"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Postal code", "Código postal")}
                    <input
                      name="codePostal"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("City", "Ciudad")}
                    <input
                      name="city"
                      autoComplete="address-level2"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("State", "Estado")}
                    <input
                      name="state"
                      autoComplete="address-level1"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                </div>
              </section>

              <section className="py-7">
                <h2 className="mb-5 font-display text-xl text-foreground">
                  {t("Card details", "Datos de la tarjeta")}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-muted-foreground sm:col-span-2">
                    {t("Name on card", "Nombre en la tarjeta")}
                    <input
                      name="cardName"
                      autoComplete="cc-name"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground sm:col-span-2">
                    {t("Card number", "Número de tarjeta")}
                    <input
                      name="cardNumber"
                      autoComplete="cc-number"
                      inputMode="numeric"
                      maxLength={23}
                      placeholder="0000 0000 0000 0000"
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Expiration (MM/YY)", "Vencimiento (MM/AA)")}
                    <input
                      name="cardDate"
                      autoComplete="cc-exp"
                      inputMode="numeric"
                      maxLength={5}
                      pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                      placeholder={language === "es" ? "MM/AA" : "MM/YY"}
                      value={cardDate}
                      onChange={(event) => {
                        const digits = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        setCardDate(
                          digits.length >= 2
                            ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                            : digits,
                        );
                      }}
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                  <label className="block text-xs font-medium text-muted-foreground">
                    {t("Security code", "Código de seguridad")}
                    <input
                      name="cardCvv"
                      type="password"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      maxLength={4}
                      required
                      className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </label>
                </div>
              </section>

              {paymentError && (
                <p
                  role="alert"
                  className="mb-5 border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {paymentError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading || cartTotalUsd <= 0}
                className="flex min-h-12 [width:100%] items-center justify-center gap-2 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:[width:auto] sm:min-w-64"
              >
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                {isLoading
                  ? t("Processing payment...", "Procesando pago...")
                  : `${t("Pay", "Pagar")} ${formatCurrency(total)}`}
              </button>
            </form>

            <aside className="h-fit border border-foreground bg-primary p-6 text-primary-foreground lg:sticky lg:top-28">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">
                    {t("Order summary", "Resumen del pedido")}
                  </p>
                  <p className="mt-2 font-display text-2xl">
                    {products.length}{" "}
                    {products.length === 1 ? t("item", "artículo") : t("items", "artículos")}
                  </p>
                </div>
                <span className="border border-primary-foreground/30 px-3 py-2 font-mono text-xs font-semibold">
                  {currency}
                </span>
              </div>

              <div className="mt-8 border-t border-primary-foreground/20 pt-5">
                <label
                  className="block text-xs font-medium text-primary-foreground/75"
                  htmlFor="discount-code"
                >
                  {t("Discount code", "Código de descuento")}
                </label>
                <input
                  id="discount-code"
                  value={discountCode}
                  onChange={(event) => onChangeDiscount(event.target.value)}
                  aria-describedby="discount-status"
                  className="mt-2 min-h-11 w-full border border-primary-foreground/30 bg-background px-3 text-sm uppercase text-foreground outline-none focus:border-background focus:ring-2 focus:ring-primary-foreground/40"
                  placeholder={t("Enter code", "Ingresa el código")}
                />
                <p
                  id="discount-status"
                  aria-live="polite"
                  className="mt-2 min-h-4 text-xs text-primary-foreground/75"
                >
                  {isValidDiscount
                    ? t("Discount code applied", "Código de descuento aplicado")
                    : discountCode
                      ? t("Code not recognized", "Código no reconocido")
                      : ""}
                </p>
              </div>

              <dl className="mt-4 space-y-3 border-t border-primary-foreground/20 pt-5 text-sm">
                <div className="flex justify-between gap-4 text-primary-foreground/75">
                  <dt>{t("Subtotal", "Subtotal")}</dt>
                  <dd>
                    {formatCurrency(convertCurrencyAmount(cartTotalUsd, "USD", currency))}
                  </dd>
                </div>
                {isValidDiscount && (
                  <div className="flex justify-between gap-4 text-accent">
                    <dt>{t("Discount applied", "Descuento aplicado")}</dt>
                    <dd>{formatCurrency(total)}</dd>
                  </div>
                )}
                <div className="flex items-end justify-between gap-4 border-t border-primary-foreground/20 pt-5">
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground/75">
                    {t("Total", "Total")}
                  </dt>
                  <dd className="font-display text-3xl">{formatCurrency(total)}</dd>
                </div>
              </dl>
              {currency === "MXN" && (
                <p className="mt-5 border-t border-primary-foreground/20 pt-4 text-xs leading-5 text-primary-foreground/70">
                  {t("Exchange rate", "Tipo de cambio")}: 1 USD = {MXN_PER_USD} MXN
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartSectionComponent;
