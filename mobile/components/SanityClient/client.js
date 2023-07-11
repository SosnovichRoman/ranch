import {createClient} from '@sanity/client';

//... TODO: вынести в .env

const client = createClient({
    projectId: 'qqwpf97s',
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: true,
    token: 'skbNZ3kXvsBrn6ndCkfAQfkF2FONkkJkJ2qNt9KxStdRDJuZX73ubsWl9fkS0ZBzgkoPB1vIoAAQLVfMcXZ7RjovA7G2pd9JICEileDlGjdIxPgPIsRyG2HitQu1YzMjGp0cRxpRFCZCjk4wtwnXyUN245DranHfqIbjfmImGxz2QjosgTDK',
});

export default client
