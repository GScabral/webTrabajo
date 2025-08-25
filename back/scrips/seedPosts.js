const { Post, User } = require("../src/db"); // Ajusta la ruta según tu proyecto

const seedPosts = async () => {
  try {
    // 1. Buscar todos los trabajadores
    const trabajadores = await User.findAll({
      where: { tipo: "trabajador" },
    });

    if (!trabajadores.length) {
      console.log("⚠️ No hay trabajadores en la base de datos.");
      return;
    }

    // 2. Generar 20 posts falsos asignados a trabajadores al azar
    const posts = Array.from({ length: 100 }).map((_, i) => {
      const randomTrabajador =
        trabajadores[Math.floor(Math.random() * trabajadores.length)];

      return {
        titulo: `Post de prueba #${i + 1}`,
        contenido: `Este es el contenido del post número ${
          i + 1
        }, creado automáticamente para pruebas.`,
        imagen_url: `https://picsum.photos/seed/post${i + 1}/600/400`,
        user_id: randomTrabajador.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // 3. Insertar todos de golpe
    await Post.bulkCreate(posts);

    console.log("✅ 20 posts creados con éxito.");
  } catch (error) {
    console.error("❌ Error al crear los posts:", error);
  }
};

// Ejecutar
seedPosts();


//node scrips/seedPosts.js
