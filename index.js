require("dotenv").config();
const express = require("express"); // Nuevo
const { Client, GatewayIntentBits } = require("discord.js");

// Token desde variables de entorno
const TOKEN = process.env.DISCORD_TOKEN;
const PORT = process.env.PORT || 3000; // Puerto para Render

// Lista de frases de amor
const frases = [
    "No sabemos lo que el futuro nos deparará, pero tengo claro que quiero que estés en mi vida y tenerte a mi lado por siempre.",
    "Eres una mujer maravillosa, hermosa y gentil, agradezco al cielo por haberte conocido, desde ese instante mi mundo cambió, se convirtió en uno lleno de paz, alegría y amor.",
    "Desde ahora mi vida te pertenece, soy tuyo, puedes hacer conmigo lo que quieras, sólo déjame permanecer a tu lado.",
    "No voy a ninguna parte, hasta que tú no me digas que ya no me necesitas más, o te hartes de ver mi cara, o me digas que desaparezca. Me quedaré en tu vida para otorgarte mi amor y hacerte feliz cada día.",
    "Sin importar la distancia que nos separa, siempre estaré para ti y elegiré amarte, porque tú eres el latido que da sentido a mi eternidad.",
    "Entre tantas sonrisas, la única que logra hacer latir mi corazón al ritmo del amor es la tuya, mi niña preciosa.",
    "No importa lo que pase, no importan los obstáculos que se interpongan en nuestro camino, yo siempre estaré presente en tu vida y lucharé por ser el hombre digno de estar a tu lado.",
    "De las pocas personas a las que les he dado la oportunidad de tener un lugar en mi corazón y en mi vida, tú, mi amor, te has ganado un lugar único, al cual solo tú tienes derecho. Ahora mi corazón late por ti, con una intensidad extraordinaria que solamente tú provocas en mí.",
    "Si existe algo que te preocupa, puedes decírmelo. Te aseguro que estaré ahí para escucharte, apoyarte y brindarte mi amor, para que este se convierta en un refugio para ti, un lugar en el cual puedas descansar, sentirte segura y sonreír.",
    "No importa si el mundo está lleno de desilusiones, tú eres mi única verdad.",
    "Aunque no pueda verte, aunque no pueda tocarte, aunque no pueda tenerte junto a mí por la distancia, siempre te llevo conmigo en los pensamientos de mi mente, en los latidos de mi corazón, en cada paso que doy mientras transito un camino que me lleve directo a tus brazos, en los momentos que vivimos juntos, los cuales atesora mi alma, ya que cada vez que los recuerdo, en mi rostro brota una sonrisa y mi interior entra en calor de la felicidad que me envuelve.",
    "Si la vida es un sueño, entonces moriré soñando a tu lado.",
    "Amar significa aceptar a alguien tal y como es, sin tratar de cambiarlo. Yo quiero brindarte un amor incondicional, un amor para toda la vida, en el cual te sientas valorada, respetada, amada y, sobre todo, puedas crecer siendo feliz cumpliendo tus sueños, cariño.",
    "Eres la persona que ilumina mi mundo y llena mi corazón de alegría. Cada momento a tu lado es como vivir un sueño eterno.",
    "Aunque nuestros caminos se separen, buscaré la forma de regresar a tu lado y quedarme contigo, ya que quiero que seas tú la persona que esté junto a mí al despertar cada mañana, que sean tus ojos los que iluminen mi vida y tu amor el que me llene de alegría.",
    "Eres mi luz en la oscuridad, el sol que ilumina mi mundo y me abriga del frío, te has convertido en la mujer que deseo amar y proteger al ser tú el motivo de mi felicidad.",
    "Estoy profundamente enamorado de ti, cada día que pasa me enamoro más y más con aquellos mensajes tan bellos que me dedicas; tales expresan tu sentir e impactan en mi corazón, siendo estos lo más lindo que he sentido al estar cubiertos de tu apasionado amor, además de tu valioso tiempo. Eres mi sol brillante en un día gris y mi refugio en los momentos difíciles.",
    "El amor verdadero nunca se desvanece, se vuelve más fuerte con cada obstáculo que superamos juntos. Eres mi fuerza y mi razón de existir.",
    "Mi corazón late al ritmo del amor, eres la responsable de provocar esto en mí; al estar a tu lado, acelera sin tener fin, algo que antes era desconocido para mí, pero ahora no quiero dejar de sentir. Cada palabra tuya es música para mis oídos. Eres la melodía perfecta en mi vida, cariño, te pido que permanezcas a mi lado y no me hagas falta nunca.",
    "El amor es una elección personal que se fortalece a diario con esfuerzo y dedicación. Es mi deseo mejorar para ofrecerte el amor que considero mereces, capaz de hacerte sonreír cada día y darte una vida plena.",
    "Yo pienso en ti todo el día, y cuando no estoy contigo, solo pienso en estar contigo, y cuando estás conmigo, me siento en paz con todo el mundo, y sé que ya nunca le pediré a Dios nada, porque desde que estés tú en mi vida tengo todo lo que siempre quise, y lo único que quiero hacer es pasar el resto de mi vida haciendo que tú seas tan feliz como me haces feliz, porque te amo.",
    "Por ti estoy dispuesto a dar lo mejor de mí. Cada paso, cada logro en mi vida será con el propósito de permanecer a tu lado y ofrecerte una vida juntos en la cual puedas ser feliz, porque tu sonrisa se ha convertido en lo más importante para mí, y tú, la persona más esencial en mi vida.",
    "En el infinito dominio de mi corazón, el amor que tengo hacia ti es un ritual eterno: mis pensamientos solo se concentran en ti, mis ojos te buscan aun cerrados o tapados, y en la espera persiste el anhelo de tenerte aquí a mi lado.",
    "No importa lo que otros digan de ti o lo que tú creas de ti misma, te amo demasiado, de verdad, te amo con locura. Quiero estar siempre contigo y siempre tomar tu mano. Si nombras 10 cosas que odies de ti misma, te diré 2.000 más que me gustan. Ese es el trato especial que tanto deseo darte.",
    "A mí sí me importa cómo te sientes, a mí sí me importa cómo va tu día, a mí sí me importa cuidarte y a mí sí me importa verte feliz. Por eso quiero, con mi amor, lograr que tu vida sea un poco más bella. Quiero ser quien esté para ti en los buenos, pero sobre todo en los malos momentos; ser un pilar donde puedas descansar y dejar tu pesada carga, donde puedas encontrar fuerzas para levantarte y continuar. Pese a lo dura que pueda ser la vida, siempre me tendrás contigo, porque yo elegí quedarme en tu vida, mi amor.",
    "Te quiero en todas tus formas, incluso en aquellas en que tengas dudas de ti misma. Para mí, cada una es única como las etapas de la luna, inigualables como las maravillas del mundo. Son perfectas porque cada una te conforma, son parte de ti. Yo te amo tal y como eres; me enamoraste al mostrarme tu esencia, al ser simplemente tú misma. En ti encuentro todo lo que me encanta, todo lo que deseo amar y proteger.",
    "No sé lo que nos depare el futuro, pero te garantizo que está en mí la voluntad de mejorar. Deseo convertirme en el hombre que pueda acompañarte en esta vida, brindándote un amor en el que seas genuinamente feliz. Puede que cometa errores, puede que sea un tonto en ocasiones; sin embargo, elijo aprender de ellos. Elijo ser una mejor versión para ti. Mi objetivo es convertirme en una buena pareja: una que te entienda, una que te escuche, una que te apoye, una que te enamore cada vez más y con la cual desees pasar el resto de tu vida, mi amor.",
    "No necesito nada más en este mundo, porque tú te has convertido en mi todo. Eres el sol que ilumina mi camino y me guía en la oscuridad, la luna que me protege en las noches y calma la tempestad.",
    "Tu llegada a mi vida la cambió totalmente, dejó de ser simplemente existir a sentirme lleno de vida a tu lado. Eres tú la luz que me ilumina y me da la calidez que calienta mi alma con ese amor único e inigualable.",
    "Llega la noche, y con ella, tus recuerdos; llega la luna, y con ella, tu sonrisa; llegan las estrellas, y con ellas, tu mirada, porque, para otros, la noche es solo oscuridad, pero para mí... es el momento donde tu amor convierte mis pesadillas en sueños extraordinarios.",
    "No puedo evitar que mi corazón lata por ti; mis latidos solo se intensifican al sentir tu cariño, al estar tú para mí. Es una conexión profunda que se fortalece con el paso de los días, una que quiero ver crecer, madurar y mejorar, porque quiero que esta sensación de felicidad que inunda mi corazón y se expande por todo mi cuerpo no me haga falta nunca, mientras mi corazón continúe activo, latiendo una y otra vez por ti.",
    "Nunca habrá una mujer más linda que tú. Nadie más tendrá esa belleza tan única que te hace especial, ni esa sonrisa tan hermosa que me enamora cada día, que le da luz a mi mundo y paz a mi alma, porque tú eres irrepetible para mí. Por eso siempre estaré dispuesto a protegerte, incluso con mi propia vida si es necesario. No me importa perderlo todo, mientras tú estés bien. Porque en este mundo, lo único que realmente me importa eres tú, mi niña preciosa.",
    "Te pido que nunca pienses que voy a dejar de amarte. No hay nada en este mundo que me lleve a algo como eso, al ser la que me brinda ese amor sincero y puro con el que siempre soñé... No te imaginas la felicidad que me das con cada mensaje, con cada ‘te amo’, con cada abrazo, con cada beso... haces que sienta que soy la persona más feliz del mundo. Tú eres el amor de mi vida, y siempre te amaré con la misma fuerza con la que te amé desde el día que te elegí. Nunca soltaré tu mano, ni en tus días más grises, ni cuando tus ánimos cambien. Estaré contigo incluso cuando el mundo se te haga pesado. Estaré contigo hasta el último suspiro. Te amaré hoy, mañana y por siempre. Contigo quiero vivir esta vida y todas las que vengan después. Nunca más estarás sola, mi niña, porque yo estaré contigo, en cuerpo y alma. Te apoyaré en todo, caminaremos juntos, siempre como un equipo.",
    "Mientras esté contigo, tengo la intención, la voluntad y toda la disposición de renunciar a todo lo demás, ya que eres tú la persona con la que anhelo estar. Eres la persona con la que elijo tener una vida. A tu lado, todo cobra sentido y no necesito de nada ni de nadie más que tú, al haberte convertido en el motivo de mi sonrisa.",
    "Solo quería recordarte que eres lo más importante para mí y me preocupo mucho por ti, mi niña. Espero que te estés alimentando bien y descansando adecuadamente, que tengas un día tan maravilloso como lo es tu sonrisa bajo mis ojos, cariño.",
    "Desde que te conocí me enseñaste muchas cosas, pero la más importante... me enseñaste lo que es el amor y ser amado.",
    "Mi niña preciosa... mientras yo viva, no permitiré que nadie borre esa sonrisa tan encantadora que tienes.",
    "He visto a mucha gente decir que la suerte les ha sonreído, pero yo te veo sonreír a ti y supongo que mi suerte tiene tus ojos, tu voz y tu nombre.",
    "Tenme paciencia, estoy aprendiendo cómo cuidarte, cómo quererte, cómo hacerte feliz, cómo darte un amor con el que te sientas a gusto cada día. Quiero hacerlo bien, porque tu amor es valioso; tú eres valiosa para mí.",
    "Cuando te conocí, jamás imaginé que encontraría un corazón tan lindo como el tuyo. Y sabes algo, quiero proteger ese corazón de la frialdad y crueldad del mundo. Quiero envolverlo en mi amor y, de esa forma, darle un lugar seguro donde pueda ser él mismo, sin prejuicios ni temor de ser lastimado.",
    "Tal vez no pueda darte un amor perfecto, pero sí un amor verdadero. Tal vez no pueda darte lo mejor del mundo, pero sí lo mejor de mí. Puede que falle y me equivoque una y otra vez, pero no voy a rendirme porque quiero que seas tú la mujer que me ame por el resto de la vida y convertirme en un hombre que merezca tu amor.",
    "Quiero que seas feliz. Si tú eres feliz y mantienes esa hermosa sonrisa, la cual ilumina mi vida, entonces mi deseo se cumplirá. Espero que mi regalo te guste, mi amor. Le puse mucho empeño y dedicación con tal de que fuera algo bonito para ti. Feliz cumpleaños, mi amor. Pásala muy bien con tus seres queridos.",
    "Para mí, eres perfecta en todos los aspectos. No hay nadie que se iguale a ti, porque solo tú tienes esa luz que brilla de una forma tan única, tan pura, que parece creada solo para encantarme. Eres más que perfecta ante mis ojos: encantadora, linda, hermosa, tierna, adorable, única... En pocas palabras, lo eres todo para mí.",
    "Yo realmente te amo y cada día que pasa me enamoro más de ti, y no sé cuándo te convertiste en el primer pensamiento que tengo cuando me despierto, que cada noche la luna y las estrellas me recuerdan a ti. Pensar en los astros me hace sentir pequeño al recordar que no somos eternos y que tenemos una vida corta en comparación con el infinito del universo. Es por ello que sé perfectamente que mi vida es limitada y finita, pero es una vida que quiero compartir, experimentar y vivir a tu lado. Al verte a los ojos, sé el rumbo que quiero para mi vida, y ese es un futuro contigo, mi amor.",
    "Quiero quedarme contigo a pesar de todo, aún nos falte mucho por vivir. Pero te lo digo ahora y te lo diré siempre: quiero quedarme contigo. Porque no quiero otra sonrisa que no sea la tuya, no quiero otros abrazos que no sean los tuyos. Quiero quedarme contigo, porque solo contigo soy feliz.",
    "La conexión de mi internet es muy mala, pero la conexión que tenemos tú y yo es lo más preciado para mí.",
    "Me haces bien, enciendes luces en mi alma. Creo en ti y en este amor, que me vuelve indestructible, que detuvo mi caída libre.",
    "La única razón de que no pierda la cabeza es que ahora tú estás en mi vida, y eso me encanta. Te amo, soy afortunado. Deseo proteger lo único que le da sentido a mi vida: esa eres tú. Te amo 3 millones.",
    "¿Quién necesita observar las estrellas en el cielo?, cuando con solo verte a los ojos tú me llevas a recorrer el universo entero.",
    "Mientras me quieras en tu vida, ahí estaré, sintiéndome afortunado de formar parte de ella, valorando tu compañía, tu confianza y la belleza de tu esencia; ahí estaré, aprendiendo tus gestos, conquistando tu corazón, bañándome en tu aroma, volviéndome el mayor admirador de tu sonrisa; mientras me quieras en tu vida, ahí estaré, amándote como desde hace mucho lo merecías.",
    "Tal vez no pueda verte todos los días, abrazarte, mirarte frente a frente, pero siempre te llevo en mis pensamientos y, especialmente, en mi corazón.",
    "Desde que llegaste nuevamente a mi vida en Semana Santa, me has hecho la persona más feliz del mundo. Contigo, cada momento es hermoso y está lleno de alegría. Con solo escuchar tu hermosa voz, mis días se iluminan y mi corazón sonríe. No cambiaría eso por nada del mundo. Tú lograste que volviera a sonreír, que mis días dejaran de ser oscuros y solitarios. Te amo por todo lo que eres, por cómo eres y por la forma en que me haces sentir con solo verte sonreír. Eres mi niña preciosa, mi alegría... mi todo.",
    "Te amo y haría cualquier cosa por ti, no solo cosas grandes, también las pequeñas, las que nadie ve, las que hacen que un mal día se vuelva un poco menos pesado. Haría todo para que nunca sufras, para que nunca te sientas sola, para que nunca dudes de lo que vales. Si pudiera, te bajaría la luna, pero la luna es poco. Yo te construiría un universo entero con estrellas hechas de paz y planetas llenos de abrazos, un lugar donde solo tú y yo existamos y todo lo demás se calle. Te amo tanto que me dolería verte llorar, que no soportaría tu tristeza, que me rompería si tú alguna vez te rompes. Quiero proteger tu sonrisa, cuidar tu calma, ser el lugar al que siempre quieras volver, porque tú, tú eres todo lo que no sabía que necesitaba, y no importa cuántas veces lo diga, nunca será suficiente para todo lo que siento por ti.",
    "Tú eres como esas estrellas que iluminan la noche, pero la diferencia entre tú y ellas es que ellas solo brillan en la oscuridad; en cambio, tú... Tú iluminas todo mi mundo por completo, de día y noche sin importar la distancia, y eso me hace muy feliz. TE AMO, MI PRINCESA, NUNCA LO OLVIDES.",
    "Dentro de mí, donde solo mis pensamientos habitan, levanté muros de esperanza, de sueños y de amor. Y en cada piedra, en cada ladrillo, en cada rendija, se anida tu esencia, tu luz, tu calor. Eres la base que sostiene mi ser, el techo que me ampara, la fortaleza que mi corazón jamás dejará.",
    "En lo que el resto del mundo, incluso tú misma, pueden considerar defectos, para mí son algo maravilloso porque, al ser parte de ti, también son parte de la obra de arte que no me cansaré nunca de admirar. Eres perfecta para mí y no cambiaría nada de ti, ni siquiera tus enojos, pues en ellos está tu esencia y ternura, aquello que me encanta y que tanto amo.",
    "Siempre serás mi persona favorita. No importa el tiempo ni la distancia, porque te seguiré eligiendo una y otra vez.",
    "No quiero a otra, no tengo a otra, no necesito a otra. Solo quiero que te des cuenta de todo el esfuerzo que hago para demostrártelo: que eres la única, eres la única que quiero en mi vida. Contigo lo tengo todo, eres mi eterno amor. A veces las palabras no son suficientes para expresar lo que siento. Quiero que veas en mis acciones cuánto significas para mí; cada pequeño gesto, cada detalle, es una muestra de mi amor por ti. No hay espacio en mi corazón para nadie más, solo tú ocupas ese lugar especial. Haces que mi vida tenga sentido, así que no necesito ni quiero a nadie más que no seas tú.",
    "Hoy pensé en ti más veces de las que puedo contar. Pensé en tu risa, esa que suena como mi canción favorita. Pensé en tu voz suave y cálida que es capaz de calmar mis tormentas. Pensé en tus ojos, esos resplandecientes que me guían incluso cuando todo está oscuro. Pensé en tu forma de hablar, de abrazar y en lo mucho que significas para mí. Tú no eres solo la persona que amo, eres también mi lugar seguro, mi calma, mi motivación, mi pedacito de paz en medio del caos. Cada noche, antes de dormir, me siento agradecido por tenerte. A veces me cuesta creer que alguien tan maravillosa como tú me haya elegido, pero aquí estamos construyendo algo real, fuerte y bonito. Espero que esta noche duermas profundamente, que tu mente descanse, que tus sueños sean suaves y dulces, y que te despiertes sintiéndote amada, valorada y cuidada, porque lo eres. Si pudiera, me acostaría a tu lado solo para abrazarte y acariciarte el cabello hasta que te duermas. Te susurraría bajito al oído lo mucho que te amo y cada tanto besaría tu frente para proteger tus sueños. Quiero que sepas que, aunque no esté ahí físicamente, ahora mismo estoy contigo en pensamiento, en deseo, en alma. Te mando un millón de besos, uno por cada razón por la que te amo. Descansa, mi vida, mañana será un nuevo día y pase lo que pase, aquí estaré para ti siempre. Te amo más que lo que las palabras podrían decir. Buenas noches, mi princesa, que los ángeles te cuiden y sueñes conmigo. TE AMO CON CADA LATIDO DE MI CORAZÓN.",
    "Quiero que sepas que eres y siempre serás la niña de mis ojos, la única que se ganó mi corazón y mi cariño. Gracias por llegar a mi vida de una manera tan linda y hacerla tan feliz.",
    "No importan cuántos días pasen, ni cuántos kilómetros nos separen, porque en este mundo lleno de gente, mi corazón siempre va a elegirte a ti.",
    "Deseo convertirme en el caballero que te proteja de los males de este mundo, el vaquero que te lleve de aventuras, el pirata que fije el rumbo en dirección a tus brazos, el mago que te deje fascinada con sus trucos, el poeta que te transporte a otro mundo con sus frases, el hombre que te ofrezca un futuro y un amor puro.",
    "Tú me diste mil razones para sonreír, ahora yo quiero darte mil razones para que seas feliz, porque para mí tú eres el principio al cual no quiero encontrar un final.",
    "Quiero arriesgarme contigo, quiero poner las manos al fuego por ti, quiero que sigan siendo tus ojos los que me dejan indefenso y que al mismo tiempo sea tu amor mi refugio, el lugar donde puedo sentirme seguro, ser feliz, ser yo mismo. Quiero que seas tú la que permanezca a mi lado, porque a tu lado me siento completo y que nada me falta.",
    "Quisiera robarte una sonrisa todos los días, un beso cada mañana, un abrazo en cada tristeza, un pensamiento en cada momento. Simplemente quiero que seas mía y yo pertenecerte eternamente.",
    "Y cuando te me acercas se acelera mi motor. Me da fiebre, me hago fuego y me vuelvo a consumir. Dame solo un beso que me alcance hasta morir. Como un vicio que me duele, quiero mirarte a los ojos.",
    "Eres la melodía que suena en mi corazón, la armonía que hace que mi alma cante con emoción. Quiero ser la canción que habite en tu corazón y poder sentir tu amor. Le das sentido a mi vida y yo anhelo brindarte toda la pasión de mi ser, en cada instante, frase y verso que te dedico, my love.",
    "Buenas noches, mi amor, espero sueñes bonito y descanses con una bella sonrisa, esa que me ignotiza, me enamora y me transporta a un mundo extraordinario. Eres mi último pensamiento al descansar y el primero al despertar. El amor que siento por ti no tiene igual; lo quiero proteger y atesorar como lo más bello de mi vida, como lo único que no quiero que me falte en este mundo.",
    "Buenos días solecito espero hayas amanecido bien, que tengas un dia tan precioso como lo son tus ojos, no olvides comer bien, tomar agua y tener cuidado, siempre te desearé lo mejor y estare para ti porque eres la persona que más amo.",
    "Sólo pasaba a desearte un bonito día. Espero que estés bien. Si no es así, ya sabes que estaré para ti y que lo único que debes hacer es llamar. Te amo, mi amor, siempre estaré pendiente de tu sentir. No olvides comer bien y tomar mucha agua, ¿sí? Un abrazo gigantesco para ti y un besito telepático. Eres mi mayor tesoro, recuérdalo siempre.",
    "Aprendo a amar bonito porque quiero que seas tú, aprendo a comunicarme porque quiero que seas tú, aprendo tus silencios porque quiero que seas tú, aprendo de mis errores porque quiero que seas tú, aprendo a sanar porque quiero que seas tú. Trato de ser una mejor versión de mí y mejorar cada día porque quiero que seas tú. Trato de comprender tus enojos y tristezas porque quiero que seas tú. Te elegí a ti y voy a amarte con cada pizca de mi ser. Quiero que seas tú el motivo de mi sonrisa, que seas tú mi apoyo y mi compañía el resto de mi vida. Mientras me permitas permanecer a tu lado, quiero darte el amor especial que guarda mi alma.",
    "No quiero atarte, eres libre de elegir el camino que deseas para tu vida. Yo simplemente seguiré brindándote mi amor, mi tiempo, mi apoyo incondicional, con tal de mejorar tu vida. Si en tu elección estoy presente, entonces sin dudarlo seré el hombre más afortunado de este mundo.",
    "Ten un día bonito. Y si por momentos se te nubla, que este mensajito sea tu rayito de cariño. Te amo con cada latido de mi corazón y aunque no esté cerca de ti, mi amor siempre estará presente, anidando en tu interior, otorgándote calor para desvanecer el gélido frío.",
    "No te esperaba, ni mi alma buscaba a nadie, pero apareciste como si la luna hubiera susurrado mi necesidad. Cada latido corre por mis venas con una intensidad inigualable que me hace feliz. Ahora escribo poemas de amor solo para ti, porque no eres sólo un capítulo de mi vida. Te convertiste en la persona con la que quiero vivir el resto de mi historia.",
    "Si amar es perder el equilibrio, entonces quiero caer en tus brazos. Si amar es arriesgar, entonces quiero jugar, cada día, con el resplandor de tu sonrisa como única apuesta.",
    "Quiero vivirlo todo contigo: los días de lluvia, las noches estrelladas, los silencios y las risas, los miedos y las locuras. Quiero ser la persona que conoce todas tus sombras y que te ama a través de ellas.",
    "Si tengo que esperar para poder estar contigo, contaré los días, las semanas y los meses, porque yo sí quiero algo único a tu lado.",
    "Ante mis ojos eres la única que brilla de una forma tan hermosa, tan radiante, que incluso transformas mi vida. No quiero alejarme de ese brillo tan deslumbrante, quiero que seas tú mi luz y mi guía. Contigo todo lo malo se aleja, te vuelves mi felicidad y mi alegría. Por ello, siempre estará en mí buscar la forma de volver a tu lado y quedarme permanentemente para ti.",
    "Te amo y te amaré más allá del tiempo y la eternidad. Ni la vida ni la muerte podrán limitar lo que siento por ti, porque mi amor por ti es infinito y eterno.",
    "Si besarte fuera arte, yo sería el pintor más apasionado; si abrazarte fuera un viaje, yo sería el viajero más afortunado; y si tenerte fuera un sueño... solo te diría que jamás quisiera ser despertado.",
    "Te amo, eres lo más importante en mi vida, y mejoraré para ti con tal de que cada experiencia que vivamos juntos la recuerdes con alegría y cariño.",
    "No estés triste, cariño, mi amor te acompañará cada día para iluminar tu vida y preservar tu encantadora sonrisa.",
    "Confía en ti misma, en tus conocimientos y capacidades. Podrás llegar tan lejos como te lo propongas, mi amor. Sin importar la dificultad o lo agotador, levántate y sigue avanzando. Me tendrás a mí para apoyarte en cada paso que des.",
    "Forjaremos nuevos momentos juntos, mi amor. En algún momento volveremos a estar unidos y podremos vivir nuevas aventuras las cuales atesorar.",
    "Quiero lograr hacerte sentir viva y feliz como tú lo logras conmigo cada día. Para ello, te daré lo mejor de mí, ya que mereces eso y más.",
    "Es curioso cómo, al estar contigo, dejo de sufrir, ya que tú te llevas todo mi dolor y tristeza, reemplazándolos por amor y felicidad.",
    "Me aferraré a ti en esta vida, ya que tú eres a quien nunca quiero perder, mi amor.",
    "Deberías ser poeta, ya que tus escritos me llevan a otra dimensión, una en la que cada palabra me llena de dicha al sentir tu gigantesco amor. Me haces sentir afortunado de tenerte en mi vida y que seas tú la que me acompaña tanto en los malos como en los buenos momentos que la vida nos prepare. Tu inigualable pasión es lo que me mantiene seguro, con el corazón encantado, ya que un segundo a tu lado es mágico para mí. Eres tú la persona que más me importa en este mundo, aquella que deseo acompañar, apoyar, amar de forma incondicional y proteger.",
    "Logras que los latidos de mi corazón se intensifiquen con tus bellas palabras. Se siente tan lindo cuando me demuestras a diario que la chica que tanto amo y deseo hacer feliz me otorga un lugar único en su corazón y me ama intensamente. Tienes que saber que mi corazón lleva tatuados los instantes que vivimos juntos, incluso los de la lejanía en los que logras hacerme sentir afortunado, siendo tú la causa de mi sonrisa.",
    "Significa mucho para mí que permanezcas a mi lado. Soy feliz al tener tu compañía, sabiendo que das de tu valioso amor y tiempo. Por ello, deseo quedarme contigo y otorgarte lo mejor de mí.",
    "Eres la causante de mi sonrisa. Es un privilegio que tú, más que nadie, puedes gozar, así que disfrútala. Siéntete feliz de ser el motivo por el cual puedo sonreír genuinamente, mi amor.",
    "Es mágico el ritmo que provocas en mí. Es bonito y placentero de sentir: un calor y alegría que recorren mi cuerpo, razón por la cual sonrío.",
    "Cada día, no solo con tus palabras sino también con tus actos, me haces sentir amado y valorado. Cada día me brindas una gran alegría. No dejes de decírmelo nunca, pues cada vez que lo haces se acelera mi palpitar por la gran dicha que provocas en mi interior.",
    "Te recuerdo todos los días con amor, ya que a tu lado he vivido los mejores momentos de mi vida, y los atesoraré siempre en lo profundo de mi alma.",
    "Te amo con cada latido de mi corazón, y este tiene un ritmo único por ti.",
    "Tu cariño es la mejor medicina para mí, me anima y me hace sentir como nuevo.",
    "Ya no sé qué hacer para que estés bien: si apagar el sol para encender tu amanecer, falar em português, aprender a hablar francés o bajar la luna hasta tus pies. Yo solo quiero darte un beso y regalarte mis mañanas, cantar para calmar tus miedos. Quiero que no te falte nada.",
    "Que todo el mundo sepa cuánto te quiero, que pase lo que pase tú eres primero, que se ilumina el cielo cuando tú estás y se me apaga el mundo cuando te vas. No pienso equivocarme con nadie más, no quiero ver mi vida con nadie más que contigo.",
    "Me encanta tu sonrisa, tiene algo que hipnotiza, me hechiza. Me encanta tu mirada, tu cara enamorada y el sabor de tu boca cuando te beso.",
    "Ya no concibo el día a día si no eres tú quien me guía, si no eres tú quien me mira. No conozco la alegría, no hay persona viva que consiga que yo así me ría. Te prometo, vida mía, que sin ti mi vida está vacía. Déjame cuidarte como nadie te ha cuidado y repetirte cada mañana lo guapa que has despertado. Déjame ser tu persona favorita del pasado para que el día en que envejezcas pueda seguir a tu lado.",
    "En tus ojos siempre invierno, en tus labios siempre verano. Si muriese por besarte, me mataba sin pensarlo. En tus piernas es otoño, primavera por tus manos. Ten mi pecho todo tuyo, sin dudar te lo regalo.",
    "Muero si pienso que algún día te pierdo, pero pierdo el miedo al recordar que ya morí por tu risa, tus ojos, tu pelo, tus manos, tu forma de ser. Ya no hay nada que pueda matarme como tú lo hiciste la primera vez. Si me arrancan los cinco sentidos, mato por la vista y por volverte a ver.",
    "Cúrame si puedes del daño que me inflijo. Te doy mi tez, te doy la vez para que seas mi cobijo. Y quiéreme, si quieres, como nadie lo hizo. Te doy mi paz, te doy mi voz y el apellido de mis hijos. Te doy todo lo que tengo y, aun así, sería rico porque no hay mayor fortuna que poder estar contigo, porque no hay mayor tesoro que tener tu amor de abrigo, y porque no hay mayor regalo que dormir en tu regazo.",
    "Si te llamo la arquitecta de mis ganas de vivir es porque estaba yendo a pique y sin intención de salir. Y para serte sincero, hoy te lo debo todo a ti, porque gracias a tu aliento mi pecho volvió a latir. Y hoy solo quiero un futuro a tu era, y que todo lo que vea sea a ti sonreír. Solo te pido que mires al cielo, que seas mi credo y que sepas que te quiero para toda mi vida.",
    "Te quiero como para escuchar tu risa toda la noche y dormir en tu pecho, sin sombras ni fantasmas. Te quiero como para no soltarte jamás.",
    "Hoy te ves más linda que nunca, y no digo que en otros días no hayas estado preciosa, pero hoy hay algo especial: esa sonrisa tuya tan especial que no solo vive en tus labios, también brilla en tus ojos. Y es que hay días en los que todo encaja, en los que tu belleza no solo se ve, sino que se siente. Y qué linda te ves cuando todo combina, haciéndote relucir como el mismo sol, mi amor.",
    "Todas las noches descanso con una gran sonrisa, cuando cada pensamiento me lleva a ti, y cada estrella me recuerda que eres el cielo donde quiero perderme.",
    "Cada mañana despierto con una gran sonrisa al ser tú mi primer pensamiento, mi amor... Desde el instante en que despierto, tu nombre invade mi mente, mi corazón y mi alma, llenándolos de alegría con solo pensarte. Cada amanecer se vuelve más hermoso y único gracias a ti. Con tu recuerdo, mi día comienza con luz, alegría y motivos para sonreír. Estar contigo es lo mejor que me ha regalado el universo; eres la razón por la que sonrío al despertar, al dormir, al descansar... Eres mi paz, mi felicidad y mi mayor motivación para ser mejor cada día y convertirme en la pareja perfecta que tú mereces, mi vida.",
    "No digas 'no te preocupes', porque sí me preocupo. No por deber, sino porque me importas. No quiero que cargues sola, ni que calles lo que sientes. Que me preocupe por ti es parte del amor que te otorgo, cariño.",
    "No poseo riquezas, pero lo poco que tengo será siempre tuyo, si con ello logro tu sonrisa. No soy el mejor entre los hombres, pero mi amor por ti será sincero y sin medida. Tal vez me falten muchas cosas, pero por ti, gustoso sería todas.",
    "Miro cada recuerdo antes de tu llegada y me doy cuenta de que ninguno se compara ante los momentos que vivimos juntos. Miro todas mis alegrías y la más grande de ellas es en tu compañía, que me ha dado más de lo que deseaba. Ahora, mi mayor anhelo es una vida junto a ti, querida, y mi mayor temor es que te alejes de mí.",
    "No solamente eres mi pareja, también eres mi calma, eres mi lugar favorito, eres mi confidente, eres mi refugio, eres mi inspiración, eres mi todo.",
    "Nunca olvides lo mucho que te amo, porque la distancia para mí nunca será un obstáculo ni impedirá que te brinde este gran amor, el cual te pertenece solamente a ti, cariño.",
    "Bonito es verte sonreír. Bonito es hablar contigo. Bonito es escuchar tu voz. Bonitos son tus ojos. Bonito es saber que te tengo en mi vida y que tú eres lo mejor de ella.",
    "Tú eres como la luz en mis ojos, no por la intensidad con que brilla, sino por la forma en que me haces ver el mundo de manera diferente.",
    "Yo te elegiría a ti; en cien vidas, en cien mundos, en cualquier versión de la realidad te encontraría y te volvería a elegir.",
    "Yo te amo. Con tu lado bueno, malo, feo, bonito, raro, enojón, cariñoso, hiriente, detallista, apasionado, inteligente, torpe, amable, cursi, bromista, indiferente, triste o alegre. Besaría cada una de tus facetas, las tomaría de la mano para ir a caminar por el sendero de la vida.",
    "Contigo aprendí lo que es querer, con fe, sin dudar, sin condiciones, como ama el sol al amanecer, con mil razones, sin explicaciones.",
    "Puede que pienses en ocasiones que no eres perfecta, que puede que no seas suficiente, sin embargo, para mí siempre lo serás, porque eres tierna, cariñosa, sincera, alegre, ocurrente y, sobre todo, con un gran corazón. Eso te hace más que perfecta y, por supuesto, suficiente bajo mis ojos. Te hace infinitamente única, infinitamente bella, infinitamente tú, y es esa esencia la que me enamora, la que siempre amaré con cada palpitar de mi pecho.",
    "Como China a Taiwán, te quiero, te pienso, te sueño y anhelo un futuro compartido en donde nuestras almas se fundan bajo una sola bandera, sin fronteras, sin distancias. Y si la muerte nos alcanza, te buscaré en mil vidas más, porque en cada una de ellas volveré a amarte.",
    "Cuando estoy en tus brazos siento que lo tengo todo. El cielo es un lugar en la Tierra contigo, y creo que encontré mi otra mitad en ti. Al igual que todas las estrellas bonitas brillan para iluminar tus noches, deseo brillar para brindarte mi luz y con ella iluminar tu vida entera."
];

// Crear cliente de Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Lista para ciclar las frases sin repetir
let frasesDisponibles = [...frases];

// Función para sacar una frase aleatoria sin repetir hasta agotar todas
function obtenerFraseAleatoria() {
  if (frasesDisponibles.length === 0) {
    frasesDisponibles = [...frases];
  }
  const index = Math.floor(Math.random() * frasesDisponibles.length);
  return frasesDisponibles.splice(index, 1)[0];
}

// Evento cuando el bot esté listo
client.once("ready", () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

// Comando: ʕっ•ᴥ•ʔっfrase 💝
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("ʕっ•ᴥ•ʔっfrase") && message.content.includes("💝")) {
    const frase = obtenerFraseAleatoria();
    message.channel.send(frase);
  }
});

// Login del bot
if (TOKEN) {
  client.login(TOKEN);
} else {
  console.error("❌ ERROR: No se encontró DISCORD_TOKEN en las variables de entorno");
}

// ====== Servidor HTTP para mantener vivo en Render ======
const app = express();

app.get("/", (req, res) => {
  res.send("🤖 Bot de Discord activo y escuchando comandos!");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor HTTP escuchando en puerto ${PORT}`);
});
