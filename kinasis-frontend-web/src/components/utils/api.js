const URL_API = import.meta.env.VITE_API_URL;

function buildPhotoSrc(enpoint, prefix) {
    const safePrefix = String(prefix || '').trim();
    if (!safePrefix) return '';

    const qs = new URLSearchParams({ prefix: safePrefix });
    return `${URL_API + enpoint}?${qs.toString()}`;
}

function normalizeMembers(payload) {
    const safeMembers = Array.isArray(payload) ? payload : [];

    return safeMembers.map((member) => ({
        ...member,
        photoSrc: buildPhotoSrc("members/getImageMemberS3", member?.foto)
    }));
}

function normalizeServices(payload) {
    const safeServices = Array.isArray(payload) ? payload : [];

    return safeServices.map((services) => ({
        ...services,
        photoSrc: buildPhotoSrc("data/getImageFromS3", services?.iconRoute)
    }));
}

export async function getMembers(isAdmin) {
    const endpoint = URL_API + 'members' + (isAdmin ? '?admin=true' : '?admin=false');

    try {
        const response = await fetch(endpoint, { method: 'GET', mode: 'cors' });
        const payload = await response.json();
        const safeMembers = normalizeMembers(payload);

        return {
            members: isAdmin ? safeMembers : [],
            notMembers: isAdmin ? [] : safeMembers,
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            members: [],
            notMembers: [],
            error: 'No se pudo cargar el equipo en este momento.'
        };
    }
}

export async function getAllMembers(prefix) {
    const endpoint = URL_API + prefix;
    const qs = new URLSearchParams({ prefix: 'members-images/founders/' });
    
    try {
        const response = await fetch(`${endpoint}?${qs.toString()}`, { method: 'GET', mode: 'cors' });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const payload = await response.json();
        return {
            images: Array.isArray(payload?.images) ? payload.images : [],
            error: null
        };
    } catch (error) {
        console.error(error);
        return {
            images: [],
            error: 'No se pudieron cargar las imágenes en este momento.'
        };
    }
}

export async function getCatalogByName(catalogName) {
    const endpoint = URL_API + 'catalogs';
    const query = `name=${catalogName}`;
    try {
        const response = await fetch(`${endpoint}?${query}`, { method: 'GET', mode: 'cors' });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const payload = await response.json();
        return {
            data: payload || {},
            error: null
        };
    }
    catch (error) {
        console.error(error);
        return {
            catalog: null,
            error: 'No se pudo cargar el catálogo en este momento.'
        };
    }
}

export async function getServices() {
    const endpoint = URL_API + 'services';
    try {
        const response = await fetch(endpoint, { method: 'GET', mode: 'cors' });
        const payload = await response.json();
        const safeServices = normalizeServices(payload);
        return {
            services: safeServices ? safeServices : [],
            error: null
        };
    }
    catch (error) {
        console.error(error);
        return {
            services: [],
            error: 'No se pudieron cargar los servicios en este momento.'
        };
    }
}