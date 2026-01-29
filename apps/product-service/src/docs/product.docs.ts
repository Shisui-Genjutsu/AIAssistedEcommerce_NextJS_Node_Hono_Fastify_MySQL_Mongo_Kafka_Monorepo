/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products/test:
 *   get:
 *     summary: Test endpoint
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Test message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OM"
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - shortDescription
 *               - description
 *               - price
 *               - sizes
 *               - colors
 *               - images
 *               - categorySlug
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               shortDescription:
 *                 type: string
 *                 example: "Brief product description"
 *               description:
 *                 type: string
 *                 example: "Detailed product description"
 *               price:
 *                 type: integer
 *                 example: 100
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["S", "M", "L"]
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Red", "Blue"]
 *               images:
 *                 type: object
 *                 example: {"main": "image1.jpg", "gallery": ["image2.jpg"]}
 *               categorySlug:
 *                 type: string
 *                 example: "electronics"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
