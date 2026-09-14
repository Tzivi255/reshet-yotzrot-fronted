import { request } from './client'

// שירות התקשורת ליוצרות מול ה-API (route: /api/profile).
// כאן גם ממופה המבנה של מודל ה-Mongo (Profile) למודל שה-UI עובד איתו.

const RESOURCE = '/profile'

// Mongo (Profile)  ->  מודל ה-UI
function fromApi(doc) {
  if (!doc) return null
  return {
    id: doc._id ?? doc.id,
    name: doc.name ?? '',
    shootingCategory: doc.shootingCategory ?? '',
    style: doc.style ?? '',
    location: doc.location ?? '',
    price: doc.price ?? 0,
    hasWhatsApp: doc.hasWhatsApp ?? false,
    phone: doc.phone ?? '',
    email: doc.email ?? '',
    portfolio: doc.portfolioLink ?? '',
    bio: doc.aboutMe ?? '',
    logoUrl: doc.logoUrl ?? '',
  }
}

// מודל ה-UI  ->  Mongo (Profile)
function toApi(model) {
  return {
    name: model.name,
    shootingCategory: model.shootingCategory,
    style: model.style,
    location: model.location,
    price: Number(String(model.price).replace(/\D/g, '')) || 0,
    hasWhatsApp: !!model.hasWhatsApp,
    phone: model.phone,
    email: model.email,
    portfolioLink: model.portfolio,
    aboutMe: model.bio,
  }
}

// מודל ה-UI -> FormData (כולל קובץ הלוגו, לשליחה כ-multipart אל ה-Backend)
function toFormData(model) {
  const fd = new FormData()
  Object.entries(toApi(model)).forEach(([key, value]) => {
    fd.append(key, value == null ? '' : String(value))
  })
  if (model.logoFile) fd.append('logo', model.logoFile)
  return fd
}

export function getPhotographers() {
  return request(RESOURCE).then((rows) =>
    Array.isArray(rows) ? rows.map(fromApi) : [],
  )
}

export function getPhotographer(id) {
  return request(`${RESOURCE}/${id}`).then(fromApi)
}

export function createPhotographer(model) {
  return request(RESOURCE, {
    method: 'POST',
    body: toFormData(model),
  }).then(fromApi)
}

export function updatePhotographer(id, model) {
  return request(`${RESOURCE}/${id}`, {
    method: 'PUT',
    body: toFormData(model),
  }).then(fromApi)
}

export function deletePhotographer(id) {
  return request(`${RESOURCE}/${id}`, { method: 'DELETE' })
}
