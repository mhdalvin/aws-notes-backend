const { getAllNotesHandler, getNoteByIdHandler, addNoteHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
    /**
     * Chrome:
     * Access to fetch at 'http://localhost:5000/notes' from origin 'http://ec2-13-212-153-62.ap-southeast-1.compute.amazonaws.com:8000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
     */
    {
        method: 'OPTIONS',
        path: '/{any*}',
        handler: (_, h) => {
            return h.response()
                .code(200);
        }
    },

    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler
    },
];

module.exports = routes;
