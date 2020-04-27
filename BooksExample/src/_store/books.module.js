import { bookService } from '../_services';
import { router } from '../_helpers';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        bookService.getAll()
            .then(
                books => commit('getAllSuccess', books),
                error => commit('getAllFailure', error)
            );
    },
    getById({ commit }, id) {
        commit('getByIDRequest');

        bookService.getById(id)
            .then(
                books => commit('getByIDSuccess', books),
                error => commit('getByIDFailure', error)
            );
    },
    create({ dispatch, commit }, book) {
        commit('createRequest', book);
    
        bookService.create(book)
            .then(
                book => {
                    commit('createSuccess', book);
                    router.push('/');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Create successful', { root: true });
                    })
                },
                error => {
                    commit('createFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    update({ dispatch, commit }, book, id) {
        commit('updateRequest', book, id);
    
        bookService.update(book, id)
            .then(
                book => {
                    commit('updateSuccess', book, id);
                    router.push('/');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Update successful', { root: true });
                    })
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    delete({ dispatch, commit }, id) {
        commit('deleteRequest', id);

        bookService.delete(id)
            .then(
                book => {
                    commit('deleteSuccess', id);
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Delete successful', { root: true });
                    })
                },
                error => {
                    commit('deleteFailure', { id, error: error.toString() });
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, books) {
        state.all = { items: books };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    getByIDRequest(state) {
        state.all = { loading: true };
    },
    getByIDSuccess(state, books) {
        state.all = { items: books };
    },
    getByIDFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(book =>
            book.id === id
                ? { ...book, deleting: true }
                : book
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(book => book.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(book => {
            if (book.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...bookCopy } = book;
                // return copy of user with 'deleteError:[error]' property
                return { ...bookCopy, deleteError: error };
            }

            return book;
        })
    },
    createRequest(state, book) {
        state.all = { creating: true };
    },
    createSuccess(state, book) {
        state.all = {};
    },
    createFailure(state, error) {
        state.all = {};
    },
    updateRequest(state, book, id) {
        state.all = { updating: true };
    },
    updateSuccess(state, book, id) {
        state.all = {};
    },
    updateFailure(state, error) {
        state.all = {};
    }
};

export const books = {
    namespaced: true,
    state,
    actions,
    mutations
};