import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type GuideLink = {label: string; to: string};

type Product = {
  name: string;
  tagline: string;
  platforms: string[];
  summary: string;
  points: ReactNode[];
  to: string;
  cta: string;
  image?: {light: string; dark: string; alt: string};
  links: GuideLink[];
};

const mainProducts: Product[] = [
  {
    name: 'Certify Management Hub',
    tagline: 'Centralized certificate management',
    platforms: ['Windows', 'Linux', 'macOS', 'Containers'],
    summary:
      'Self-hosted web-based certificate management for one server or your whole organization, with the same core features as Certificate Manager.',
    points: [
      'Manage certificates across many CCM instances from one place',
      'Multi-user, role-based access and scoped API access',
      'Managed DNS challenges and Certificate Subscriptions',
      <>
        <Link to="/docs/deployment/tasks_intro">Deployment tasks</Link> to install certificates on servers, services and
        devices
      </>,
    ],
    to: '/docs/hub/',
    cta: 'Hub documentation',
    image: {
      light: '/assets/screens/home/hub-summary-light.webp',
      dark: '/assets/screens/home/hub-summary-dark.webp',
      alt: 'Certify Management Hub summary page',
    },
    links: [
      {label: 'Install the Hub', to: '/docs/hub/installation/'},
      {label: 'Request and deploy certificates', to: '/docs/hub/guides/request-and-deploy-certificates'},
      {label: 'Manage CCM and agent instances', to: '/docs/hub/guides/managed-instances'},
      {label: 'Certify Management Agent', to: '/docs/hub/guides/agent'},
    ],
  },
  {
    name: 'Certify Certificate Manager',
    tagline: 'Desktop app for Windows Server & IIS',
    platforms: ['Windows'],
    summary:
      'Simple automated ACME certificates for Windows with a desktop UI and background service. Optionally joins the Hub as a managed instance.',
    points: [
      'Automatic renewal with direct IIS integration',
      <>
        <Link to="/docs/deployment/tasks_intro">Deployment tasks</Link> and custom scripts for other services
      </>,
      "Let's Encrypt, Google Trust Services and other ACME CAs",
      "Certify Management Agent also available for Linux."
    ],
    to: '/docs/intro',
    cta: 'Certificate Manager documentation',
    image: {
      light: '/assets/screens/Startup_Light.png',
      dark: '/assets/screens/Startup_Dark.png',
      alt: 'Certify Certificate Manager desktop app',
    },
    links: [
      {label: 'Install Certificate Manager', to: '/docs/guides/installation'},
      {label: 'Request your first certificate', to: '/docs/certificate-process'},
      {label: 'Deployment tasks', to: '/docs/deployment/tasks_intro'},
      {label: 'Join CCM to the Hub', to: '/docs/hub/guides/ccm'},
    ],
  },
];

const otherProducts: Product[] = [
  {
    name: 'Certify Dashboard',
    tagline: 'Hosted renewal monitoring',
    platforms: ['Cloud'],
    summary:
      'Monitor certificate renewals across your organization, reported from Certificate Manager or other ACME clients via the Management Agent.',
    points: [],
    to: '/docs/dashboard',
    cta: 'Dashboard documentation',
    image: {
      light: '/assets/screens/home/dashboard.webp',
      dark: '/assets/screens/home/dashboard.webp',
      alt: 'Certify Dashboard renewal status',
    },
    links: [],
  },
  {
    name: 'Certify DNS',
    tagline: 'Hosted DNS challenge delegation',
    platforms: ['Cloud'],
    summary:
      'Complete ACME DNS challenges using CNAME delegation, without running your own acme-dns server. Works with most acme-dns compatible clients.',
    points: [],
    to: '/docs/dns/providers/certifydns',
    cta: 'Certify DNS setup guide',
    links: [],
  },
];

const topics: {title: string; description: string; to: string}[] = [
  {title: 'New to Certify?', description: 'A high-level summary of the products and how they fit together.', to: '/docs/summary'},
  {title: 'Deployment tasks', description: 'Deploy certificates to web servers, cloud services, appliances and more.', to: '/docs/deployment/tasks_intro'},
  {title: 'DNS validation', description: 'Choose a DNS provider for wildcard and DNS-validated certificates.', to: '/docs/dns/validation'},
  {title: 'Certificate Authorities', description: "Use Let's Encrypt, Google, ZeroSSL, or private ACME CAs.", to: '/docs/guides/certificate-authorities'},
  {title: 'Troubleshooting', description: 'Diagnose failed requests, renewals and deployments.', to: '/docs/guides/troubleshooting'},
  {title: 'Licensing', description: 'Evaluation, license keys and activation.', to: '/docs/guides/licensing'},
];

function ArrowIcon() {
  return (
    <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className={styles.mediaIcon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Platforms({platforms}: {platforms: string[]}) {
  return (
    <ul className={styles.platforms} aria-label="Platforms">
      {platforms.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

function ProductMedia({product}: {product: Product}) {
  return (
    <Link to={product.to} className={styles.media} tabIndex={-1} aria-hidden="true">
      {product.image ? (
        <ThemedImage
          alt={product.image.alt}
          sources={{light: useBaseUrl(product.image.light), dark: useBaseUrl(product.image.dark)}}
        />
      ) : (
        <div className={styles.dnsVisual}>
          <GlobeIcon />
          <code>_acme-challenge</code>
          <span className={styles.dnsArrow}>CNAME ↓</span>
          <span className={styles.dnsTarget}>Certify DNS answers the ACME challenge</span>
        </div>
      )}
    </Link>
  );
}

function MainProductCard({product}: {product: Product}) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <p className={styles.tagline}>{product.tagline}</p>
        <h2 className={styles.cardTitle}>
          <Link to={product.to}>{product.name}</Link>
        </h2>
        <Platforms platforms={product.platforms} />
      </header>
      <ProductMedia product={product} />
      <div className={styles.cardBody}>
        <p>{product.summary}</p>
        <ul className={styles.points}>
          {product.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className={styles.guides}>
          <h3>Start here</h3>
          <ul>
            {product.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link className={`button button--primary ${styles.cta}`} to={product.to}>
          {product.cta} <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

function OtherProductCard({product}: {product: Product}) {
  return (
    <article className={`${styles.card} ${styles.cardCompact}`}>
      <ProductMedia product={product} />
      <div className={styles.cardBody}>
        <p className={styles.tagline}>{product.tagline}</p>
        <h2 className={styles.cardTitle}>
          <Link to={product.to}>{product.name}</Link>
        </h2>
        <p>{product.summary}</p>
        <Link className={styles.textLink} to={product.to}>
          {product.cta} <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Product documentation for Certify The Web: Certify Management Hub, Certify Certificate Manager, Certify Dashboard and Certify DNS.">
      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>Certify The Web documentation</h1>
          <p>
            Automated SSL/TLS certificate management for Windows, Linux, macOS and cloud environments. Choose a
            product to get started.
          </p>
        </header>

        <section className={styles.mainGrid} aria-label="Products">
          {mainProducts.map((p) => (
            <MainProductCard key={p.name} product={p} />
          ))}
        </section>

        <section className={styles.otherGrid} aria-label="Hosted services">
          {otherProducts.map((p) => (
            <OtherProductCard key={p.name} product={p} />
          ))}
        </section>

        <section className={styles.topics}>
          <h2>Common topics</h2>
          <div className={styles.topicGrid}>
            {topics.map((t) => (
              <Link key={t.to} to={t.to} className={styles.topic}>
                <strong>{t.title}</strong>
                <span>{t.description}</span>
              </Link>
            ))}
          </div>
          <p className={styles.footnote}>
            Browse everything from the <Link to="/docs/">documentation overview</Link>, or visit{' '}
            <Link to="https://certifytheweb.com">certifytheweb.com</Link> for feature summaries and pricing.
          </p>
        </section>
      </main>
    </Layout>
  );
}
