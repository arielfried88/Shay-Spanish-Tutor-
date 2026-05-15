import { Lesson } from '@/types/content'

export const LESSONS: Lesson[] = [
  // GREETINGS
  { id: 'greetings_1', topicId: 'greetings', hebrewTitle: 'שלום! הכירי את הספרדית', difficulty: 1, gameType: 'flashcard_match', wordPool: ['greet_hola','greet_adios','greet_gracias','greet_porfavor','greet_si','greet_no'], xpReward: 20 },
  { id: 'greetings_2', topicId: 'greetings', hebrewTitle: 'בחרי את הנכון!', difficulty: 1, gameType: 'multiple_choice', wordPool: ['greet_hola','greet_adios','greet_gracias','greet_porfavor','greet_buenos_dias','greet_buenas_noches','greet_como_estas','greet_me_llamo','greet_si','greet_no'], xpReward: 20 },
  { id: 'greetings_3', topicId: 'greetings', hebrewTitle: 'מה שמעתי?', difficulty: 2, gameType: 'audio_riddle', wordPool: ['greet_hola','greet_adios','greet_gracias','greet_porfavor','greet_buenos_dias','greet_buenas_noches','greet_si','greet_no'], xpReward: 35 },

  // COLORS
  { id: 'colors_1', topicId: 'colors', hebrewTitle: 'גלי את הצבעים!', difficulty: 1, gameType: 'flashcard_match', wordPool: ['color_rojo','color_azul','color_verde','color_amarillo','color_naranja','color_blanco'], xpReward: 20 },
  { id: 'colors_2', topicId: 'colors', hebrewTitle: 'איזה צבע זה?', difficulty: 1, gameType: 'multiple_choice', wordPool: ['color_rojo','color_azul','color_verde','color_amarillo','color_naranja','color_blanco','color_negro','color_rosa','color_morado','color_marron'], xpReward: 20 },
  { id: 'colors_3', topicId: 'colors', hebrewTitle: 'מסיון הצבע המסתורי', difficulty: 2, gameType: 'mystery_mission', wordPool: ['color_rojo','color_azul','color_verde','color_amarillo','color_naranja','color_rosa','color_morado'], xpReward: 35 },

  // NUMBERS
  { id: 'numbers_1', topicId: 'numbers', hebrewTitle: 'ספרי בספרדית!', difficulty: 1, gameType: 'flashcard_match', wordPool: ['num_uno','num_dos','num_tres','num_cuatro','num_cinco','num_seis'], xpReward: 20 },
  { id: 'numbers_2', topicId: 'numbers', hebrewTitle: 'כמה זה?', difficulty: 2, gameType: 'multiple_choice', wordPool: ['num_uno','num_dos','num_tres','num_cuatro','num_cinco','num_seis','num_siete','num_ocho','num_nueve','num_diez'], xpReward: 35 },
  { id: 'numbers_3', topicId: 'numbers', hebrewTitle: 'שמעי ובחרי', difficulty: 2, gameType: 'audio_riddle', wordPool: ['num_uno','num_dos','num_tres','num_cuatro','num_cinco','num_seis','num_siete','num_ocho','num_nueve','num_diez','num_once','num_doce'], xpReward: 35 },

  // ANIMALS
  { id: 'animals_1', topicId: 'animals', hebrewTitle: 'פגשי את החיות!', difficulty: 1, gameType: 'word_image_match', wordPool: ['animal_perro','animal_gato','animal_pajaro','animal_pez','animal_caballo','animal_vaca','animal_leon','animal_elefante'], xpReward: 20 },
  { id: 'animals_2', topicId: 'animals', hebrewTitle: 'איזו חיה זו?', difficulty: 1, gameType: 'multiple_choice', wordPool: ['animal_perro','animal_gato','animal_pajaro','animal_pez','animal_caballo','animal_vaca','animal_leon','animal_elefante','animal_mono','animal_conejo'], xpReward: 20 },
  { id: 'animals_3', topicId: 'animals', hebrewTitle: 'חידות חיות', difficulty: 3, gameType: 'mystery_mission', wordPool: ['animal_perro','animal_gato','animal_leon','animal_elefante','animal_mono','animal_conejo'], xpReward: 50 },

  // BODY PARTS
  { id: 'body_1', topicId: 'body', hebrewTitle: 'חלקי הגוף', difficulty: 1, gameType: 'flashcard_match', wordPool: ['body_cabeza','body_ojo','body_nariz','body_boca','body_oreja','body_mano'], xpReward: 20 },
  { id: 'body_2', topicId: 'body', hebrewTitle: 'הצבעי על הגוף', difficulty: 2, gameType: 'word_image_match', wordPool: ['body_cabeza','body_ojo','body_nariz','body_boca','body_oreja','body_mano','body_pie','body_pelo'], xpReward: 35 },
  { id: 'body_3', topicId: 'body', hebrewTitle: 'שמעי איפה?', difficulty: 2, gameType: 'audio_riddle', wordPool: ['body_cabeza','body_ojo','body_nariz','body_boca','body_oreja','body_mano','body_pie','body_pelo','body_barriga','body_brazo'], xpReward: 35 },

  // FOOD
  { id: 'food_1', topicId: 'food', hebrewTitle: 'מה טעים?', difficulty: 1, gameType: 'word_image_match', wordPool: ['food_manzana','food_platano','food_pan','food_leche','food_agua','food_pizza','food_helado','food_chocolate'], xpReward: 20 },
  { id: 'food_2', topicId: 'food', hebrewTitle: 'מה אני אוכלת?', difficulty: 2, gameType: 'multiple_choice', wordPool: ['food_manzana','food_platano','food_pan','food_leche','food_agua','food_pizza','food_helado','food_chocolate','food_huevo','food_pollo'], xpReward: 35 },
  { id: 'food_3', topicId: 'food', hebrewTitle: 'חידות אוכל', difficulty: 3, gameType: 'mystery_mission', wordPool: ['food_manzana','food_platano','food_helado','food_chocolate','food_pizza'], xpReward: 50 },

  // FAMILY
  { id: 'family_1', topicId: 'family', hebrewTitle: 'המשפחה שלי', difficulty: 1, gameType: 'flashcard_match', wordPool: ['fam_mama','fam_papa','fam_hermana','fam_hermano','fam_abuela','fam_abuelo'], xpReward: 20 },
  { id: 'family_2', topicId: 'family', hebrewTitle: 'מי זה?', difficulty: 2, gameType: 'multiple_choice', wordPool: ['fam_mama','fam_papa','fam_hermana','fam_hermano','fam_abuela','fam_abuelo','fam_bebe','fam_familia'], xpReward: 35 },
  { id: 'family_3', topicId: 'family', hebrewTitle: 'שמעי מי מדבר', difficulty: 2, gameType: 'audio_riddle', wordPool: ['fam_mama','fam_papa','fam_hermana','fam_hermano','fam_abuela','fam_abuelo','fam_bebe','fam_familia'], xpReward: 35 },

  // SCHOOL
  { id: 'school_1', topicId: 'school', hebrewTitle: 'הכיתה שלנו', difficulty: 1, gameType: 'word_image_match', wordPool: ['school_lapiz','school_libro','school_mochila','school_mesa','school_silla','school_pizarra','school_papel','school_tijeras'], xpReward: 20 },
  { id: 'school_2', topicId: 'school', hebrewTitle: 'מה יש בתיק?', difficulty: 2, gameType: 'multiple_choice', wordPool: ['school_lapiz','school_libro','school_mochila','school_mesa','school_silla','school_pizarra','school_papel','school_tijeras'], xpReward: 35 },
  { id: 'school_3', topicId: 'school', hebrewTitle: 'חידות כיתה', difficulty: 3, gameType: 'mystery_mission', wordPool: ['school_lapiz','school_libro','school_mochila','school_pizarra','school_tijeras'], xpReward: 50 },

  // ACTIONS
  { id: 'actions_1', topicId: 'actions', hebrewTitle: 'מה אנחנו עושים?', difficulty: 2, gameType: 'word_image_match', wordPool: ['act_correr','act_saltar','act_bailar','act_cantar','act_comer','act_beber','act_dormir','act_jugar'], xpReward: 35 },
  { id: 'actions_2', topicId: 'actions', hebrewTitle: 'שמעי ובחרי', difficulty: 2, gameType: 'audio_riddle', wordPool: ['act_correr','act_saltar','act_bailar','act_cantar','act_comer','act_beber','act_dormir','act_jugar','act_leer','act_dibujar'], xpReward: 35 },
  { id: 'actions_3', topicId: 'actions', hebrewTitle: 'מסיון פעולות', difficulty: 3, gameType: 'mystery_mission', wordPool: ['act_bailar','act_cantar','act_jugar','act_dibujar','act_correr'], xpReward: 50 },

  // SPORTS
  { id: 'sports_1', topicId: 'sports', hebrewTitle: 'ספורט בספרדית', difficulty: 2, gameType: 'word_image_match', wordPool: ['sport_futbol','sport_baloncesto','sport_natacion','sport_tenis','sport_ciclismo','sport_gimnasia','sport_beisbol','sport_voleibol'], xpReward: 35 },
  { id: 'sports_2', topicId: 'sports', hebrewTitle: 'איזה ספורט?', difficulty: 2, gameType: 'multiple_choice', wordPool: ['sport_futbol','sport_baloncesto','sport_natacion','sport_tenis','sport_ciclismo','sport_gimnasia','sport_beisbol','sport_voleibol'], xpReward: 35 },
  { id: 'sports_3', topicId: 'sports', hebrewTitle: 'אלוף הספורט', difficulty: 3, gameType: 'mystery_mission', wordPool: ['sport_futbol','sport_baloncesto','sport_natacion','sport_tenis','sport_gimnasia'], xpReward: 50 },
]

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(l => l.id === id)
}

export function getLessonsForTopic(topicId: string): Lesson[] {
  return LESSONS.filter(l => l.topicId === topicId)
}
