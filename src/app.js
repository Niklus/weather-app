const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Setup handlebars engine and vies location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// Setup static directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather", name: "Nicholas" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Nicholas" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nicholas",
    message: "This is the help page, how can I help?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          location,
          forecast,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nicholas",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Nicholas",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
