export default async (req, res) => {
    if (req.method === 'POST') {
        const { firstName, lastName, email } = req.body;

        // Ici, tu peux ajouter ton code pour enregistrer les données dans ta base de données

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' }); // Gère les méthodes autres que POST
    }
};
