const fs = require("fs");
const http = require("http");
const path = require("path");

const getInventory = () => {
    try {
        const data = fs.readFileSync("inventory.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return { items: [] };
    }
};

const handlePostInventory = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const parsedBody = JSON.parse(body);
            const inventory = getInventory();
            const lastId = inventory.items.length > 0
                ? inventory.items[inventory.items.length - 1].id
                : 0;

            const newItem = {
                id: lastId + 1,
                name: parsedBody.name,
                quantity: parsedBody.quantity || 1,
                Category: parsedBody.Category || "general"
            };

            inventory.items.push(newItem);
            fs.writeFileSync("inventory.json", JSON.stringify(inventory, null, 2));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, item: newItem }));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON data" }));
        }
    });
};

const handleGetHome = (res) => {
    const readStream = fs.createReadStream("page1.html", "utf-8");
    let html = '';
    readStream.on('data', chunk => {
        html += chunk;
    });

    readStream.on('end', () => {
        const inventory = getInventory();
        const itemsList = inventory.items
            .map(item => `<li>${item.name} - Quantity: ${item.quantity} - Category: ${item.Category}</li>`)
            .join("");
        html = html.replace("{{INVENTORY_LIST}}", itemsList || "<li>No items in inventory</li>");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });

    readStream.on('error', (error) => {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
    });
};

const handleGetAstronomy = (res) => {
    const readStream = fs.createReadStream("page2.html", "utf-8");
    readStream.on('error', (error) => {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    readStream.pipe(res);
};

const handleGetSerbal = (res) => {
    const readStream = fs.createReadStream("page3.html", "utf-8");
    readStream.on('error', (error) => {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error reading file");
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    readStream.pipe(res);
};

const handleGetNotFound = (res) => {
    const readStream = fs.createReadStream("page4.html", "utf-8");
    readStream.on('error', (error) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    });
    res.writeHead(404, { "Content-Type": "text/html" });
    readStream.pipe(res);
};

const serveStaticFile = (filePath, contentType, res) => {
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', (error) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
    });
    res.writeHead(200, { "Content-Type": contentType });
    readStream.pipe(res);
};

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "POST" && url === "/inventory") {
        handlePostInventory(req, res);
    } else if (method === "GET" && url === "/") {
        handleGetHome(res);
    } else if (method === "GET" && url === "/astronomy") {
        handleGetAstronomy(res);
    } else if (method === "GET" && url === "/serbal") {
        handleGetSerbal(res);
    }
    else if (method === "GET" && url.endsWith(".css")) {
        const filePath = path.join(__dirname, url);
        serveStaticFile(filePath, "text/css", res);
    }
    else if (method === "GET" && (url.endsWith(".jpg") || url.endsWith(".jpeg"))) {
        const filePath = path.join(__dirname, url);
        serveStaticFile(filePath, "image/jpeg", res);
    }
    else {
        handleGetNotFound(res);
    }
});

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});