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

if (!serviceDomain || !apiKey) {
  throw new Error(
    "microCMS environment variables are missing. Set MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY in .env (local) or Repository Secrets (CI).",
  );
}

const baseUrl = `https://${serviceDomain}.microcms.io/api/v1`;

async function fetchMicroCMS<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
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
  const data = await fetchMicroCMS<ListResponse<Activity>>(
    `/activities?orders=-date&limit=100`,
  );
  return data.contents;
}

export async function getActivityById(id: string): Promise<Activity> {
  return fetchMicroCMS<Activity>(`/activities/${id}`);
}
