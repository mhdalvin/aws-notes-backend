const { nanoid } = require('nanoid');
const notes = require('./notes');

/**
 * 
 * @param {*} _ 
 * @param {*} h 
 * @returns 
 */
const getAllNotesHandler = (_, h) => {
    return h.response({
        status: 'success',
        data: {
            notes
        },
    })
    .code(200);
}

/**
 * 
 * @param {*} request 
 * @param {*} h 
 * @returns 
 */
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    let note = notes.filter((note) => note.id == id)[0];

    if (note === undefined) {
        return h.response({
            status: 'fail',
            message: `Catatan dengan ID '${id}' tidak ditemukan`,
        })
        .code(404);
    }

    return h.response({
        status: 'success',
        data: {
            note
        },
    })
    .code(200);
}

/**
 * 
 * @param {*} request 
 * @param {*} h 
 * @returns 
 */
const addNoteHandler = (request, h) => {
    const id = nanoid(16);
    const { title, tags, body } = request.payload;
    const createdAt = updatedAt = new Date().toISOString();

    const note = {
        id, title, tags, body, createdAt, updatedAt,
    }

    notes.push(note);

    const sukses = notes.filter((note) => note.id == id).length > 0;

    if (sukses) {
        return h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        .code(201);
    } else {
        return h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        })
        .code(500);
    }
};

/**
 * 
 * @param {*} request 
 * @param {*} h 
 */
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    let index = notes.findIndex((note) => note.id == id);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: `Catatan gagal diperbarui, karena catatan dengan ID '${id}' tidak ditemukan`,
        })
        .code(404);
    }

    notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
    }

    const sukses = notes.filter((note) => note.id == id)[0].updatedAt == updatedAt;

    if (sukses) {
        return h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        })
        .code(200);
    } else {
        return h.response({
            status: 'fail',
            message: 'Catatan gagal diperbarui',
        })
        .code(500);
    }
}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    let index = notes.findIndex((note) => note.id == id);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: `Catatan gagal dihapus, karena catatan dengan ID '${id}' tidak ditemukan`,
        })
        .code(404);
    }

    notes.splice(index, 1);

    const sukses = notes.filter((note) => note.id == id).length == 0;

    if (sukses) {
        return h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        })
        .code(200);
    } else {
        return h.response({
            status: 'fail',
            message: 'Catatan gagal dihapus',
        })
        .code(500);
    }
}

module.exports = { getAllNotesHandler, getNoteByIdHandler, addNoteHandler, editNoteByIdHandler, deleteNoteByIdHandler };
