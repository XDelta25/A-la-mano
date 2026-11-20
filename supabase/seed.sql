-- A la mano · datos de ejemplo (los mismos del prototipo)
-- Córrelo DESPUÉS de schema.sql, también en SQL Editor.
-- Cambia el número de WhatsApp '5210000000000' por uno real de prueba.

insert into public.categorias (id, nombre, icono, orden) values
  ('carpinteria',  'Carpintería',  'carpinteria',  1),
  ('herreria',     'Herrería',     'herreria',     2),
  ('plomeria',     'Plomería',     'plomeria',     3),
  ('electricidad', 'Electricidad', 'electricidad', 4),
  ('pintura',      'Pintura',      'pintura',      5),
  ('albanileria',  'Albañilería',  'albanileria',  6),
  ('jardineria',   'Jardinería',   'jardineria',   7);

insert into public.prestadores
  (id, nombre, iniciales, tono, categoria_id, especialidad, descripcion, servicios,
   anios, disponibilidad, calificacion, num_resenas, km, whatsapp)
values
  ('ramon-trevino', 'Ramón Treviño', 'RT', '#CFDAE4', 'herreria', 'Portones y barandales',
   'Fabricación e instalación de portones, barandales y ventanas. Trabajo con material de calidad y entrego en la fecha acordada.',
   array['Portones','Barandales','Ventanas','Reparaciones'], 6, 'hoy', 4.9, 38, 2.1, '5210000000000'),

  ('jorge-martinez', 'Jorge Martínez', 'JM', '#D9DDE2', 'herreria', 'Ventanas y protecciones',
   'Protecciones, ventanas y puertas de herrería a la medida, con acabado en pintura electrostática.',
   array['Ventanas','Protecciones','Puertas'], 9, 'hoy', 4.8, 27, 3.0, '5210000000000'),

  ('esteban-cortes', 'Esteban Cortés', 'EC', '#CFDAE4', 'herreria', 'Soldadura y estructuras',
   'Soldadura de estructuras metálicas, techos y cobertizos para casas y negocios.',
   array['Estructuras','Techos','Cobertizos'], 12, 'manana', 4.7, 41, 4.6, '5210000000000'),

  ('hector-salinas', 'Héctor Salinas', 'HS', '#D9DDE2', 'herreria', 'Rejas y reparaciones',
   'Reparación y fabricación de rejas, cerraduras y herrajes para el hogar.',
   array['Rejas','Cerraduras','Reparaciones'], 4, 'semana', 4.6, 19, 5.2, '5210000000000'),

  ('luis-garza', 'Luis Garza', 'LG', '#D9DDE2', 'carpinteria', 'Closets y cocinas',
   'Cocinas integrales, closets y muebles a medida. Diseño y fabricación en madera y melamina.',
   array['Cocinas','Closets','Muebles a medida'], 15, 'manana', 4.8, 52, 3.4, '5210000000000'),

  ('mario-cantu', 'Mario Cantú', 'MC', '#C3D0DC', 'plomeria', 'Instalaciones y reparaciones',
   'Instalación y reparación de tuberías, calentadores y baños. Atiendo urgencias.',
   array['Fugas','Calentadores','Baños'], 10, 'hoy', 4.8, 44, 1.8, '5210000000000');

insert into public.trabajos (prestador_id, titulo, tono) values
  ('ramon-trevino',  'Portón corredizo',        '#CFDAE4'),
  ('ramon-trevino',  'Barandal de escalera',    '#D9DDE2'),
  ('ramon-trevino',  'Ventana con protección',  '#C3D0DC'),
  ('jorge-martinez', 'Protección de ventana',   '#D9DDE2'),
  ('jorge-martinez', 'Puerta de entrada',       '#CFDAE4'),
  ('jorge-martinez', 'Reja de patio',           '#C3D0DC'),
  ('esteban-cortes', 'Techo de cochera',        '#CFDAE4'),
  ('esteban-cortes', 'Estructura de local',     '#D9DDE2'),
  ('esteban-cortes', 'Cobertizo',               '#C3D0DC'),
  ('hector-salinas', 'Reja frontal',            '#D9DDE2'),
  ('hector-salinas', 'Reparación de portón',    '#CFDAE4'),
  ('hector-salinas', 'Herrajes',                '#C3D0DC'),
  ('luis-garza',     'Cocina integral',         '#D9DDE2'),
  ('luis-garza',     'Closet empotrado',        '#CFDAE4'),
  ('luis-garza',     'Mueble de baño',          '#C3D0DC'),
  ('mario-cantu',    'Instalación de baño',     '#C3D0DC'),
  ('mario-cantu',    'Calentador',              '#CFDAE4'),
  ('mario-cantu',    'Cambio de tubería',       '#D9DDE2');

insert into public.resenas (prestador_id, autor, iniciales, trabajo, estrellas, texto, created_at) values
  ('ramon-trevino', 'Ana M.', 'AM', 'Portón corredizo', 5,
   'Quedó muy bien el portón, llegó puntual y limpió todo al terminar.',
   now() - interval '14 days');
