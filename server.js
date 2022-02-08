app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(_dirname, "public")));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log('App listening on port ${PORT}!');
  sequelize.sync({ force: true});
});