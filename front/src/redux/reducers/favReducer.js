const initialState = {
    favPost: [],
    favTrabajador: [],
    loading: false,
    error: null,
};

const favReducer = (state = initialState, action) => {
    // registra las acciones que llegan (útil para debug)
    // console.log("Fav reducer:", action.type, action.payload);

    switch (action.type) {
        // GET ALL POSTS FAVORITES
        case "GET_FAVPOST_REQUESTT":
            return { ...state, loading: true, error: null };
        case "GET_FAVPOST_SUCCESS":
            return { ...state, loading: false, favPost: Array.isArray(action.payload) ? action.payload : [], error: null };
        case "GET_FAVPOST_FAILL":
            return { ...state, loading: false, error: action.payload || "Error al obtener favoritos de posts" };

        // GET ALL TRABAJADOR FAVORITES
        case "GET_FAVTRABAJADOR_REQUEST":
            return { ...state, loading: true, error: null };
        case "GET_FAVTRABAJADOR_SUCCESS":
            return { ...state, loading: false, favTrabajador: Array.isArray(action.payload) ? action.payload : [], error: null };
        case "GET_FAVTRABAJADOR_FAIL":
            return { ...state, loading: false, error: action.payload || "Error al obtener favoritos de trabajadores" };

        // ADD FAVORITE (toggle / create)
        case "ADD_FAV_REQUEST":
            return { ...state, loading: true, error: null };
        case "ADD_FAV_SUCCESS": {
            const fav = action.payload?.fav || action.payload; // compatibilidad con distintas actions
            if (!fav) return { ...state, loading: false };

            // determina tipo y evita duplicados
            if (fav.target_type === "post" || fav.target_type === "Post" || fav.post) {
                const exists = state.favPost.some(f =>
                    (f.target_id && String(f.target_id) === String(fav.target_id)) ||
                    (f.post && f.post.id && String(f.post.id) === String(fav.target_id))
                );
                return {
                    ...state,
                    loading: false,
                    favPost: exists ? state.favPost : [fav, ...state.favPost],
                    error: null,
                };
            }

            if (fav.target_type === "trabajador" || fav.target_type === "user" || fav.trabajador) {
                const exists = state.favTrabajador.some(f =>
                    (f.target_id && String(f.target_id) === String(fav.target_id)) ||
                    (f.trabajador && f.trabajador.id && String(f.trabajador.id) === String(fav.target_id))
                );
                return {
                    ...state,
                    loading: false,
                    favTrabajador: exists ? state.favTrabajador : [fav, ...state.favTrabajador],
                    error: null,
                };
            }

            // si no reconoce el tipo, no modifica
            return { ...state, loading: false };
        }

        case "ADD_FAV_FAIL":
            return { ...state, loading: false, error: action.payload || "Error al agregar favorito" };

        // DELETE FAVORITE
        case "DELETE_FAV_REQUEST":
            return { ...state, loading: true, error: null };
        case "DELETE_FAV_SUCCESS": {
            const target_type = action.payload?.target_type || action.payload?.server?.target_type;
            const target_id = action.payload?.target_id || action.payload?.server?.target_id || action.payload?.targetId;
            if (!target_type || typeof target_id === "undefined") {
                return { ...state, loading: false, error: null };
            }

            if (target_type === "post") {
                const newFavPost = state.favPost.filter(f =>
                    !(
                        (f.target_id && String(f.target_id) === String(target_id)) ||
                        (f.post && f.post.id && String(f.post.id) === String(target_id)) ||
                        (f.Post && f.Post.id && String(f.Post.id) === String(target_id))
                    )
                );
                return { ...state, loading: false, favPost: newFavPost, error: null };
            }

            if (target_type === "trabajador") {
                const newFavTrab = state.favTrabajador.filter(f =>
                    !(
                        (f.target_id && String(f.target_id) === String(target_id)) ||
                        (f.trabajador && f.trabajador.id && String(f.trabajador.id) === String(target_id)) ||
                        (f.User && f.User.id && String(f.User.id) === String(target_id))
                    )
                );
                return { ...state, loading: false, favTrabajador: newFavTrab, error: null };
            }

            return { ...state, loading: false };
        }
        case "DELETE_FAV_FAIL":
            return { ...state, loading: false, error: action.payload || "Error al eliminar favorito" };

        default:
            return state;
    }
};

export default favReducer;