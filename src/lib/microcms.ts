export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type GalleryItem = {
  fieldId: string;
  image: MicroCMSImage;
  caption?: string;
};

export type LinkItem = {
  fieldId: string;
  label: string;
  url: string;
};

export type Activity = {
  id: string;
  title: string;
  slug?: string;
  date: string;
  summary: string;
  body: string;
  mainImage: MicroCMSImage;
  gallery?: GalleryItem[];
  instagramUrl?: string;
  links?: LinkItem[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

type ListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

const isConfigured = Boolean(serviceDomain && apiKey);

if (!isConfigured) {
  console.warn(
    "[microcms] MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY are not set. Building with empty activity data. Set them in .env (local) or Repository Secrets (CI) to fetch real content.",
  );
}

const baseUrl = isConfigured
  ? `https://${serviceDomain}.microcms.io/api/v1`
  : "";

async function fetchMicroCMS<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey as string,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `microCMS request failed: ${res.status} ${res.statusText} ${text}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function getActivities(): Promise<Activity[]> {
  if (!isConfigured) return [];
  const data = await fetchMicroCMS<ListResponse<Activity>>(
    `/activities?orders=-date&limit=100`,
  );
  return data.contents;
}

export async function getActivityById(id: string): Promise<Activity | null> {
  if (!isConfigured) return null;
  return fetchMicroCMS<Activity>(`/activities/${id}`);
}
