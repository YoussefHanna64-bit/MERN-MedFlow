const AuthGreenPanel = ({ title, description, items = [] }) => {
  return (
    <section className="rounded-3xl bg-primary p-8 text-white shadow-lg sm:p-10">
      <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-lg text-white/85 sm:text-lg">{description}</p>

      <div className="mt-8 space-y-4">
        {items.map((item, index) => {
          return (
            <div key={item.title} className="rounded-2xl bg-white/10 p-4">
              <item.icon className="h-5 w-5" />
              <p className="mt-2 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/80">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AuthGreenPanel;
