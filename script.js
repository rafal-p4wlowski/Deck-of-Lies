// Główna klasa menadżera gry
class GameManager {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.allCardTypes = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // Wszystkie dostępne karty
        this.cardTypes = ['A', 'Q', 'K']; // Domyślnie As, Queen i King jako karty stołowe
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades']; // Kolory kart
        this.tableCard = '';
        this.tableSuit = '';
        this.lastAction = null;
        this.playerToShoot = null;
        this.winnerCount = 0; // Licznik zwycięzców
        this.isSelectingWinner = false; // Flag for winner selection mode
        this.playerToDeclareWinner = null; // Player selected to be declared winner
        this.lastGamePlayers = []; // Zapamiętani gracze z ostatniej gry
        this.currentLanguage = 'en'; // Domyślny język to angielski

        // Słowniki dla różnych języków
        this.translations = {
            en: {
                // Menu główne
                'last-game': 'Last Game',
                'new-game': 'New Game',
                'settings': 'Settings',
                'game-rules': 'Game Rules',

                // Ustawienia gry
                'language': 'Language',
                'select-language': 'Select language:',
                'table-cards': 'Table Cards',
                'select-table-cards': 'Select which cards can be drawn as table cards:',
                'initial-trigger-pulls': 'Initial Trigger Pulls',
                'initial-shots': 'Initial number of trigger pulls:',

                // Skróty klawiaturowe
                'keyboard-shortcuts': 'Keyboard Shortcuts',
                'play-card': 'Perform action',
                'challenge-liar': 'Challenge liar',
                'declare-winners': 'Declare winner',
                'reset': 'Reset game',
                'return-to-menu': 'Return to menu',
                'during-challenge': 'During challenge',
                'yes': 'Yes', // Corrected: Removed trailing space
                'no': 'No',

                // Ekran gry
                'table-card': 'Table Card:',
                'current-turn': 'Current turn:',
                'play-card-btn': 'Play/Shoot [Space]',
                'challenge-liar-btn': 'Challenge liar [C]',
                'declare-winners-btn': 'Declare winner [W]',
                'reset-game-btn': 'Reset game [R]',
                'return-to-menu-btn': 'Return to menu [ESC]',
                'game-log': 'Game Log:',

                // Nowa gra
                'add-player': 'Add Player',
                'start-game': 'Start Game',
                'remove': 'Remove',

                // Zasady gry
                'game-objective': 'Game Objective',
                'objective-desc-1': 'Players try to convince others that their declarations about the cards they hold are true – even if they\'re bluffing',
                'objective-desc-2': 'The goal is to eliminate opponents or get rid of all your cards.',
                'general-rules': 'General Rules',
                'win-condition': 'Win condition: Be the last one standing or get rid of all your cards!',
                'turn-order': 'The player to the left is the previous player, the player to the right is the next player.',
                'round-end': 'Each round ends with challenging the previous player and taking a shot based on the revealed cards.',
                'hidden-cards': 'Cards are not revealed unless challenged, so bluffing is possible.',
                'table-card-rule': 'One card from Q/K/A is designated as the Table Card',
                'standard-game-requirements': 'What Will You Need For A Standard Game?',
                'required-cards': 'Cards: Queen (Q) ×6, King (K) ×6, Ace (A) ×6, Joker ×2. (★)',
                'required-table': 'Table or flat surface for play.',
                'required-players': 'From 2 to 4 players.',
                'special-cards': 'Special Cards',
                'table-card-desc': 'Table Card: A randomly selected face card (Q, K, or A) that determines which cards players must (or pretend to) play in a given round.',
                'joker-desc': 'Joker: A wild card that can substitute for any required table card (Q, K, or A).',
                'turn-sequence': 'Turn Sequence',
                'play-cards': 'In your turn, you can play cards, placing them face down in the center of the table.',
                'next-player-choice': 'The next player can either believe you and play their cards or challenge your truthfulness by saying "Liar!".',
                'liar-challenge': 'Liar Challenge',
                'challenge-procedure': 'If someone challenges your declaration:',
                'cards-revealed': '- The played cards are revealed',
                'check-requirements': '- It\'s checked whether all cards match the current requirement (table card)',
                'truthful-outcome': 'If the player\'s declaration turns out to be true – the challenger must pull the trigger of the revolver.',
                'lying-outcome': 'If bluffing is discovered – the player who lied must pull the trigger.',
                'russian-roulette': 'Russian Roulette',
                'revolver-desc': 'Each player\'s revolver is loaded with one bullet, randomly positioned between shots 1-6. The indicator (x/6) shows shots fired.',
                'loser-shoots': 'The player who lost the challenge must pull the trigger of the revolver.',
                'shoot-outcome-death': 'If the revolver fires, the player loses and is out of the game.',
                'shoot-outcome-survive': 'If the revolver doesn\'t fire, the game continues.',
                'game-flow': 'Game Flow',
                'after-shot': 'After each shot from the revolver (regardless of the outcome), a new table card is drawn.',
                'game-end': 'The game ends when only one living player remains.',

                // Wiadomości logów gry
                'game-started': 'Game started!',
                'players-seated': 'Players were randomly seated at the table.',
                'player-turn': 'Player turn:',
                'player-dead': '%s is already dead and cannot play!',
                'player-won': '%s already won and cannot play!',
                'played-card': '%s played a card.',
                'player-got-rid': '%s becomes WINNER #%s!',
                'game-over-last': 'GAME OVER! %s is the last player and LOSES!',
                'player-dead-challenge': '%s is dead and cannot challenge a liar!',
                'player-won-challenge': '%s already won and cannot challenge a liar!',
                'cannot-challenge': 'Cannot challenge - no one has played a card yet!',
                'player-dead-challenged': '%s is already dead and cannot be challenged!',
                'already-checked': '%s has already been checked this round, cannot challenge again!',
                'challenged': '%s challenged %s: "LIAR!"',
                'was-lying': 'Was %s lying?',
                'yes-lying': 'Yes',
                'no-truth': 'No',
                'player-lied': '%s was lying! Must play Russian Roulette.',
                'player-truth': '%s was telling the truth! %s must play Russian Roulette.',
                'player-dead-shoot': '%s is already dead and cannot shoot!',
                'player-survived': '%s survived the shot! (%s/6)',
                'player-died': '%s did NOT survive the shot! (%s/6)',
                'no-more-players': 'GAME OVER! There are no more active players!',
                'game-reset': 'Game reset!',
                'shot-result': 'Shot Result',
                'survived': 'SURVIVED!',
                'died': 'DIED!',
                'survival-chance': 'Survival chance: %s%',
                'table-card-info': 'Table card: %s %s',
                // Nowe wiadomości dla funkcji Win
                'winners-declared': 'Winners have been declared!',
                'player-becomes-winner': '%s becomes WINNER #%s!',
                'last-player-loses': 'Last player %s LOSES the game!',
                // New translations for single winner declaration
                'declare-winner-btn': 'Declare winner [W]',
                'confirm-winner-title': 'Confirm Winner',
                'confirm-winner-message': 'Did player %s win?',
                'select-player-prompt': 'Click on the player card to declare them a winner.'
            },
            pl: {
                // Menu główne
                'last-game': 'Ostatnia Gra',
                'new-game': 'Nowa Gra',
                'settings': 'Ustawienia',
                'game-rules': 'Zasady Gry',

                // Ustawienia gry
                'language': 'Język',
                'select-language': 'Wybierz język:',
                'table-cards': 'Karty stołowe',
                'select-table-cards': 'Wybierz, które karty mogą być losowane jako karty stołowe:',
                'initial-trigger-pulls': 'Wstępne pociągnięcia spustu',
                'initial-shots': 'Początkowa liczba pociągnięć spustu:',

                // Skróty klawiaturowe
                'keyboard-shortcuts': 'Skróty klawiaturowe',
                'play-card': 'Wykonaj akcję',
                'challenge-liar': 'Wyzwij kłamcę',
                'declare-winners': 'Ogłoś zwycięzcę',
                'reset': 'Reset gry',
                'return-to-menu': 'Powrót do menu',
                'during-challenge': 'Podczas wyzwania',
                'yes': 'Tak',
                'no': 'Nie',

                // Ekran gry
                'table-card': 'Karta na stole:',
                'current-turn': 'Obecna tura:',
                'play-card-btn': 'Zagraj/Strzel [Spacja]',
                'challenge-liar-btn': 'Wyzwij kłamcę [C]',
                'declare-winners-btn': 'Ogłoś zwycięzcę [W]',
                'reset-game-btn': 'Reset gry [R]',
                'return-to-menu-btn': 'Wróć do menu [ESC]',
                'game-log': 'Log gry:',

                // Nowa gra
                'add-player': 'Dodaj gracza',
                'start-game': 'Rozpocznij grę',
                'remove': 'Usuń',

                // Zasady gry
                'game-objective': 'Cel gry',
                'objective-desc-1': 'Gracze starają się przekonać innych, że ich deklaracje dotyczące posiadanych kart są prawdziwe – nawet jeśli blefują',
                'objective-desc-2': 'Celem jest wyeliminowanie przeciwników lub pozbycie się wszystkich kart.',
                'general-rules': 'Zasady Ogólne',
                'win-condition': 'Warunek zwycięstwa: Bądź ostatnim, który pozostał przy życiu!',
                'turn-order': 'Gracz po lewej to poprzedni gracz, gracz po prawej to następny gracz.',
                'round-end': 'Każda runda kończy się wyzwaniem poprzedniego gracza i oddaniem strzału w oparciu o ujawnione karty.',
                'hidden-cards': 'Karty nie są ujawniane, chyba że zostaną zakwestionowane, więc blefowanie jest możliwe.',
                'table-card-rule': 'Jedna karta z Q/K/A jest wyznaczona jako karta Stołowa',
                'standard-game-requirements': 'Co będzie potrzebne do standardowej gry?',
                'required-cards': 'Karty: Dama (Q) ×6, Król (K) ×6, As (A) ×6, Joker ×2. (★)',
                'required-table': 'Stół lub płaska powierzchnia do gry.',
                'required-players': 'Od 2 do 4 graczy.',
                'special-cards': 'Specjalne karty',
                'table-card-desc': 'Karta stołowa: Losowo wybrana figura (Q, K lub A) określająca, jakie karty gracze muszą (lub udają, że) zagrywają w danej rundzie.',
                'joker-desc': 'Joker: Uniwersalna karta, która może zastępować dowolną wymaganą kartę stołową (Q, K lub A).',
                'turn-sequence': 'Przebieg tury',
                'play-cards': 'Gracz w swojej turze może zagrać karty, kładąc je zakryte na środku stołu.',
                'next-player-choice': 'Kolejny gracz może uwierzyć i dołożyć karty lub podważyć prawdomówność, mówiąc "Kłamiesz!".',
                'liar-challenge': 'Wyzwanie kłamcy',
                'challenge-procedure': 'Jeśli ktoś podważy deklarację:',
                'cards-revealed': '- Karty zagranego gracza są odkrywane',
                'check-requirements': '- Sprawdzane jest, czy wszystkie karty odpowiadają aktualnemu wymaganiu (karcie stołowej)',
                'truthful-outcome': 'Jeśli deklaracja gracza okazuje się prawdziwa – osoba podważająca musi pociągnąć za spust rewolweru.',
                'lying-outcome': 'Jeśli odkryto blef – gracz, który kłamał, jest zmuszony pociągnąć za spust.',
                'russian-roulette': 'Rosyjska Ruletka',
                'revolver-desc': 'Rewolwer każdego gracza jest naładowany jedną kulą, losowo umiejscowioną pomiędzy strzałami 1-6. Wskaźnik (x/6) wskazuje oddane strzały.',
                'loser-shoots': 'Gracz, który przegrał wyzwanie, musi pociągnąć za spust rewolweru.',
                'shoot-outcome-death': 'Jeśli rewolwer wystrzeli, gracz przegrywa i odpada z gry.',
                'shoot-outcome-survive': 'Jeśli rewolwer nie wystrzeli, gra toczy się dalej.',
                'game-flow': 'Przebieg gry',
                'after-shot': 'Po każdym strzale z rewolweru (niezależnie od wyniku) losowana jest nowa karta stołowa.',
                'game-end': 'Gra kończy się, gdy zostanie tylko jeden żywy gracz.',

                // Wiadomości logów gry
                'game-started': 'Gra rozpoczęta!',
                'players-seated': 'Gracze zostali losowo rozsadzeni przy stole.',
                'player-turn': 'Kolej gracza:',
                'player-dead': '%s nie żyje i nie może zagrać!',
                'player-won': '%s już wygrał i nie może zagrać!',
                'played-card': '%s zagrał kartę.',
                'player-got-rid': '%s zostaje WYGRANYM #%s!',
                'game-over-last': 'KONIEC GRY! %s jest ostatnim graczem i PRZEGRYWA!',
                'player-dead-challenge': '%s nie żyje i nie może wyzwać kłamcy!',
                'player-won-challenge': '%s już wygrał i nie może wyzwać kłamcy!',
                'cannot-challenge': 'Nie można wyzwać - nikt jeszcze nie zagrał karty!',
                'player-dead-challenged': '%s jest już martwy, nie można go wyzwać!',
                'already-checked': '%s został już sprawdzony w tej rundzie, nie można go ponownie wyzwać!',
                'challenged': '%s wyzwał %s: "KŁAMCA!"',
                'was-lying': 'Czy %s kłamał?',
                'yes-lying': 'Tak',
                'no-truth': 'Nie',
                'player-lied': '%s kłamał! Musi zagrać w ruletkę.',
                'player-truth': '%s mówił prawdę! %s musi zagrać w ruletkę.',
                'player-dead-shoot': '%s jest już martwy i nie może strzelać!',
                'player-survived': '%s przeżył strzał! (%s/6)',
                'player-died': '%s NIE przeżył strzału! (%s/6)',
                'no-more-players': 'KONIEC GRY! Nie ma więcej aktywnych graczy!',
                'game-reset': 'Gra zresetowana!',
                'shot-result': 'Wynik strzału',
                'survived': 'PRZEŻYŁ!',
                'died': 'ZMARŁ!',
                'survival-chance': 'Szansa na przeżycie: %s%',
                'table-card-info': 'Karta stołowa: %s %s',
                // Nowe wiadomości dla funkcji Win
                'winners-declared': 'Zwycięzcy zostali ogłoszeni!',
                'player-becomes-winner': '%s zostaje WYGRANYM #%s!',
                'last-player-loses': 'Ostatni gracz %s PRZEGRYWA grę!',
                // New translations for single winner declaration
                'declare-winner-btn': 'Ogłoś zwycięzcę [W]',
                'confirm-winner-title': 'Potwierdź Zwycięzcę',
                'confirm-winner-message': 'Czy gracz %s wygrał?',
                'select-player-prompt': 'Kliknij na kartę gracza, aby ogłosić go zwycięzcą.'
            }
        };

        // Domyślne ustawienia gry
        this.settings = {
            startingShots: 0        // Początkowa liczba pociągnięć spustu
        };

        this.setupEventListeners();
        this.setupKeyboardControls();
        this.showMainMenu(); // Wyświetl menu główne na starcie
        this.updateLanguage('en'); // Zastosuj domyślny język
    }

    // Metoda do aktualizacji tekstu w oparciu o język
    updateLanguage(lang) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang; // Zaktualizuj atrybut lang w HTML

        // Zaktualizuj wszystkie elementy z atrybutem data-lang
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });

        // Zaktualizuj placeholdery dla pól graczy
        document.querySelectorAll('.player-name').forEach((input, index) => {
            const playerNumber = index + 1;
            input.placeholder = lang === 'en' ? `Player ${playerNumber}` : `Gracz ${playerNumber}`;
            if (input.value === (lang === 'en' ? `Gracz ${playerNumber}` : `Player ${playerNumber}`)) {
                input.value = lang === 'en' ? `Player ${playerNumber}` : `Gracz ${playerNumber}`;
            }
        });
    }

    // Inicjalizacja nasłuchiwania zdarzeń
    setupEventListeners() {
        // Przyciski menu głównego
        document.getElementById('last-game').addEventListener('click', () => this.startLastGame());
        document.getElementById('new-game-setup').addEventListener('click', () => this.showSetupMenu());
        document.getElementById('game-rules').addEventListener('click', () => this.showRulesMenu());
        document.getElementById('game-settings').addEventListener('click', () => this.showSettingsMenu());
        document.getElementById('back-to-main').addEventListener('click', () => this.showMainMenu());
        document.getElementById('back-to-main-from-setup').addEventListener('click', () => this.showMainMenu());
        document.getElementById('back-to-main-from-settings').addEventListener('click', () => {
            // Zapisz ustawienia przed wyjściem
            this.saveSettings();
            this.showMainMenu();
        });

        // Przyciski menu ustawień
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.updateLanguage(e.target.value);
        });
        document.getElementById('starting-shots').addEventListener('change', (e) => {
            this.settings.startingShots = parseInt(e.target.value);
        });

        // Przyciski menu ustawień nowej gry
        document.getElementById('add-player').addEventListener('click', () => this.addPlayerField());
        document.getElementById('start-game').addEventListener('click', () => this.startGame());

        // Przyciski gry - zoptymalizowane, został tylko jeden główny przycisk
        document.getElementById('play-card').addEventListener('click', () => this.handleMainAction());
        document.getElementById('challenge-liar').addEventListener('click', () => this.challengeLiar());
        document.getElementById('win').addEventListener('click', () => this.startWinnerSelection()); // Changed function call
        document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
        document.getElementById('return-to-menu').addEventListener('click', () => this.showMainMenu());

        // Obsługa usuwania graczy
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-player')) {
                const playerEntry = e.target.closest('.player-entry');
                if (playerEntry && document.querySelectorAll('.player-entry').length > 2) {
                    playerEntry.remove();
                    this.updatePlayerFields();
                }
            }
        });

        // Add listener for player card clicks (delegated from container)
        document.getElementById('players-container').addEventListener('click', (e) => this.handlePlayerCardClickForWinner(e));

        // Add listener for general card clicks (delegated from document)
        document.addEventListener('click', (e) => {
            const cardElement = e.target.closest('.card');
            if (!cardElement) return; // Clicked outside a card

            // Handle clicks within the table card selector in settings
            const selectorContainer = cardElement.closest('#table-card-selector');
            if (selectorContainer) {
                cardElement.classList.toggle('disabled');
                cardElement.classList.toggle('enabled');
                return; // Stop further processing for selector cards
            }

            // Handle clicks on cards outside the selector (e.g., table card - though flipping isn't used currently)
            // Check if the card is NOT inside the player container (those are handled separately for winner selection)
            const playerContainer = cardElement.closest('#players-container');
            if (!playerContainer) {
                 // Example: Toggle flip class if needed for other cards in the future
                 // cardElement.classList.toggle('flip');
            }
        });
    }

    // Główna funkcja obsługująca akcje - zagranie karty lub strzał
    handleMainAction() {
        // Jeśli przycisk strzału jest widoczny, wykonaj strzał
        if (!document.getElementById('play-card').disabled) {
            if (this.playerToShoot) {
                this.takeShot();
            } else {
                this.playCard();
            }
        }
    }

    // Dodana obsługa skrótów klawiaturowych
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // Nie obsługuj klawiszy, gdy gracz wprowadza tekst w polu input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // Sprawdź czy przycisk gry jest aktywny i widoczny
            const gameScreen = document.getElementById('game-screen');
            if (!gameScreen.classList.contains('active')) {
                return; // Gra nie jest aktywna, nie reaguj na klawisze
            }

            // Sprawdź, czy jest otwarty jakiś modal
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                // Jeśli modal jest otwarty, obsłuż specjalne skróty dla modala
                if (openModal.querySelector('#was-lying') && openModal.querySelector('#was-truthful')) {
                    // To jest modal z wyzwaniem kłamcy
                    switch (e.key.toLowerCase()) {
                        case 'y':
                            // Symuluj kliknięcie przycisku "Tak, kłamał"
                            openModal.querySelector('#was-lying').click();
                            break;
                        case 'n':
                            // Symuluj kliknięcie przycisku "Nie, mówił prawdę"
                            openModal.querySelector('#was-truthful').click();
                            break;
                    }
                } else if (openModal.querySelector('#close-result')) {
                    // To jest modal z wynikiem strzału, obsłuż zamknięcie
                    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                        openModal.querySelector('#close-result').click();
                    }
                } else if (openModal.id === 'confirmWinnerModal') { // Check for the specific winner confirmation modal
                    // To jest modal potwierdzenia ogłoszenia zwycięzcy
                    switch (e.key.toLowerCase()) {
                        case 'y':
                            // Symuluj kliknięcie przycisku "Tak"
                            openModal.querySelector('#confirmWinnerYes').click();
                            break;
                        case 'n':
                            // Symuluj kliknięcie przycisku "Nie"
                            openModal.querySelector('#confirmWinnerNo').click();
                            break;
                        case 'escape': // Optional: Allow Escape to cancel
                            openModal.querySelector('#confirmWinnerNo').click();
                            break;
                    }
                } else if (openModal.querySelector('#confirm-winners')) { // Keep the old logic for the multi-winner modal if it exists elsewhere
                    // To jest modal potwierdzenia ogłoszenia zwycięzców (multiple)
                    switch (e.key.toLowerCase()) {
                        case 'y':
                            openModal.querySelector('#confirm-winners').click();
                            break;
                        case 'n':
                            openModal.querySelector('#cancel-winners').click();
                            break;
                        case 'escape':
                            openModal.querySelector('#cancel-winners').click();
                            break;
                    }
                }
                return;
            }

            // Obsługa standardowych skrótów gry
            switch (e.key) {
                case ' ': // Spacja - główny przycisk akcji (zagranie karty lub strzał)
                    if (!document.getElementById('play-card').disabled) {
                        this.handleMainAction();
                    }
                    break;
                case 'c': // Klawisz C - Wyzwij kłamcę
                case 'C':
                    if (!document.getElementById('challenge-liar').disabled) {
                        this.challengeLiar();
                    }
                    break;
                case 'w': // Klawisz W - Ogłoś zwycięzcę
                case 'W':
                    if (!document.getElementById('win').disabled) {
                        this.startWinnerSelection(); // Changed function call
                    }
                    break;
                case 'r': // Klawisz R - Reset gry
                case 'R':
                    if (!document.getElementById('reset-game').disabled) {
                        this.resetGame();
                    }
                    break;
                case 'Escape': // Klawisz Escape - Powrót do menu
                    this.showMainMenu();
                    break;
            }
        });
    }

    // --- New Winner Declaration Logic ---

    // Starts the process of selecting a single winner
    startWinnerSelection() {
        // Check if there are enough active players to declare a winner
        const activePlayers = this.players.filter(player => player.isAlive && !player.isWinner);
        if (activePlayers.length < 2) {
            this.log(this.formatMessage('no-more-players')); // Or a more specific message
            return;
        }

        this.isSelectingWinner = true;
        this.playerToDeclareWinner = null; // Reset selection
        this.log(this.formatMessage('select-player-prompt'));

        // Add visual cue for selection mode (e.g., class to body or container)
        document.getElementById('players-container').classList.add('selecting-winner');

        // Disable other actions while selecting
        document.getElementById('play-card').disabled = true;
        document.getElementById('challenge-liar').disabled = true;
        document.getElementById('win').disabled = true; // Disable itself during selection
        document.getElementById('reset-game').disabled = true;

        // Add temporary event listener for player card clicks
        // We'll add this listener properly in setupEventListeners later
    }

    // Handles click on a player card during winner selection
    handlePlayerCardClickForWinner(event) {
        if (!this.isSelectingWinner) return; // Only act if in selection mode

        const cardElement = event.target.closest('.player-card');
        if (!cardElement) return; // Clicked outside a card

        const playerId = parseInt(cardElement.dataset.playerId);
        const selectedPlayer = this.players.find(p => p.id === playerId);

        if (selectedPlayer && selectedPlayer.isAlive && !selectedPlayer.isWinner) {
            this.playerToDeclareWinner = selectedPlayer;
            this.showConfirmWinnerModal(selectedPlayer);
        } else {
            // Optional: Provide feedback if an invalid player is clicked (e.g., dead or already winner)
            this.log("Cannot select this player."); // Simple log for now
        }
    }

    // Shows the modal to confirm the selected winner
    showConfirmWinnerModal(player) {
        const modal = document.getElementById('confirmWinnerModal');
        const messageElement = document.getElementById('confirmWinnerMessage');
        const yesButton = document.getElementById('confirmWinnerYes');
        const noButton = document.getElementById('confirmWinnerNo');

        messageElement.textContent = this.formatMessage('confirm-winner-message', player.name);

        // Remove previous listeners if any, before adding new ones
        const newYesButton = yesButton.cloneNode(true);
        yesButton.parentNode.replaceChild(newYesButton, yesButton);
        newYesButton.addEventListener('click', () => this.confirmWinner(player));

        const newNoButton = noButton.cloneNode(true);
        noButton.parentNode.replaceChild(newNoButton, noButton);
        newNoButton.addEventListener('click', () => this.cancelWinnerSelection());

        modal.style.display = 'block';
    }

    // Confirms the selected player as a winner
    confirmWinner(player) {
        const modal = document.getElementById('confirmWinnerModal');
        modal.style.display = 'none';

        this.winnerCount++;
        player.isWinner = true;
        player.winnerRank = this.winnerCount;
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Use translated strings for buttons
        const yesText = this.formatMessage('yes');
        const noText = this.formatMessage('no');

        modalContent.innerHTML = `
            <h3 data-lang="confirm-winner-title">${this.formatMessage('confirm-winner-title')}</h3>
            <p>${this.formatMessage('confirm-winner-message', player.name)}</p>
            <button id="confirmWinnerYesDynamic">${yesText} [Y]</button>
            <button id="confirmWinnerNoDynamic">${noText} [N]</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        this.activeModal = modal; // Store reference to the active modal

        // Add event listeners to the new buttons
        document.getElementById('confirmWinnerYesDynamic').addEventListener('click', () => this.confirmWinner(player));
        document.getElementById('confirmWinnerNoDynamic').addEventListener('click', () => this.cancelWinnerSelection());
    }

    // Confirms the selected player as a winner
    confirmWinner(player) {
        const modal = document.getElementById('confirmWinnerModal');
        modal.style.display = 'none';

        this.winnerCount++;
        player.isWinner = true;
        player.winnerRank = this.winnerCount;
        this.log(this.formatMessage('player-becomes-winner', player.name, player.winnerRank));

        // Reset selection state
        this.isSelectingWinner = false;
        this.playerToDeclareWinner = null;
        document.getElementById('players-container').classList.remove('selecting-winner');

        // Check if game ends (only one active player left)
        const activePlayers = this.players.filter(p => p.isAlive && !p.isWinner);
        if (activePlayers.length === 1) {
            const loser = activePlayers[0];
            this.log(this.formatMessage('last-player-loses', loser.name));
            // Game ends, keep buttons disabled except reset/menu
            document.getElementById('play-card').disabled = true;
            document.getElementById('challenge-liar').disabled = true;
            document.getElementById('win').disabled = true;
            document.getElementById('reset-game').disabled = false; // Re-enable reset
        } else {
            // Game continues, re-enable buttons
            document.getElementById('play-card').disabled = false;
            // Challenge button state depends on last action, update it
            this.updateChallengeButtonState();
            document.getElementById('win').disabled = false; // Re-enable declare winner
            document.getElementById('reset-game').disabled = false;
        }

        this.renderPlayers();
        this.checkGameEnd(); // Check again after potential loser declaration
    }

    // Cancels the winner selection process
    cancelWinnerSelection() {
        const modal = document.getElementById('confirmWinnerModal');
        modal.style.display = 'none';

        this.isSelectingWinner = false;
        this.playerToDeclareWinner = null;
        document.getElementById('players-container').classList.remove('selecting-winner');

        // Re-enable buttons
        document.getElementById('play-card').disabled = false;
        this.updateChallengeButtonState(); // Update challenge button based on context
        document.getElementById('win').disabled = false;
        document.getElementById('reset-game').disabled = false;

        this.log("Winner declaration cancelled."); // Optional log message
    }

    // --- End of New Winner Declaration Logic ---


    // Wyświetla menu główne
    showMainMenu() {
        document.getElementById('main-menu').classList.add('active');
        document.getElementById('main-menu').classList.remove('hidden');

        document.getElementById('setup-menu').classList.add('hidden');
        document.getElementById('setup-menu').classList.remove('active');

        document.getElementById('rules-menu').classList.add('hidden');
        document.getElementById('rules-menu').classList.remove('active');

        document.getElementById('settings-menu').classList.add('hidden');
        document.getElementById('settings-menu').classList.remove('active');

        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('active');

        // Aktywuj/dezaktywuj przycisk ostatniej gry
        document.getElementById('last-game').disabled = this.lastGamePlayers.length === 0;
    }

    // Wyświetla menu zasad gry
    showRulesMenu() {
        document.getElementById('rules-menu').classList.add('active');
        document.getElementById('rules-menu').classList.remove('hidden');

        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('active');
    }

    // Wyświetla menu ustawień nowej gry
    showSetupMenu() {
        document.getElementById('setup-menu').classList.add('active');
        document.getElementById('setup-menu').classList.remove('hidden');

        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('active');
    }

    // Wyświetla menu ustawień gry
    showSettingsMenu() {
        document.getElementById('settings-menu').classList.add('active');
        document.getElementById('settings-menu').classList.remove('hidden');

        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('active');

        // Aktualizuj interfejs ustawień
        this.updateSettingsUI();
    }

    // Aktualizacja interfejsu ustawień
    updateSettingsUI() {
        // Ustaw wartości w polach formularza
        document.getElementById('starting-shots').value = this.settings.startingShots;
        document.getElementById('language-select').value = this.currentLanguage;

        // Generuj karty do wyboru
        const cardSelectorContainer = document.getElementById('table-card-selector');
        cardSelectorContainer.innerHTML = '';

        // Dodaj klasę cards--poker do kontenera
        cardSelectorContainer.classList.add('cards--poker');

        // Dla każdej figury/wartości karty
        this.allCardTypes.forEach(cardType => {
            // Używaj kier dla wizualnej reprezentacji
            const suit = 'hearts';
            const isSelected = this.cardTypes.includes(cardType);

            // Utwórz kontener dla karty
            const cardDiv = document.createElement('div');
            cardDiv.className = `card ${suit} rank-${cardType} ${isSelected ? 'enabled' : 'disabled'}`;
            cardDiv.dataset.cardType = cardType;

            cardDiv.innerHTML = `
                <div class="flipper">
                    <div class="face">
                        <div class="suit"></div>
                        <div class="rank">${cardType}</div>
                    </div>
                    <div class="back"></div>
                </div>
            `;

            cardSelectorContainer.appendChild(cardDiv);
        });
    }

    // Zapisz ustawienia
    saveSettings() {
        // Zapisz liczbę pociągnięć
        this.settings.startingShots = parseInt(document.getElementById('starting-shots').value) || 0;

        // Zapisz język
        const selectedLanguage = document.getElementById('language-select').value;
        this.updateLanguage(selectedLanguage);

        // Zbierz wybrane typy kart
        const selectedCardTypes = [];
        document.querySelectorAll('#table-card-selector .card:not(.disabled)').forEach(card => {
            const cardType = card.dataset.cardType;
            if (cardType) {
                selectedCardTypes.push(cardType);
            }
        });

        // Ustaw typy kart (jeśli żadna nie wybrana, użyj domyślnych)
        this.cardTypes = selectedCardTypes.length > 0 ? selectedCardTypes : ['A', 'Q', 'K'];
    }

    // Formatuje komunikat z tłumaczeń z podstawieniem argumentów
    formatMessage(key, ...args) {
        let message = this.translations[this.currentLanguage][key] || key;
        if (args && args.length) {
            // Zastąp %s argumentami w kolejności
            let i = 0;
            message = message.replace(/%s/g, () => args[i++] !== undefined ? args[i - 1] : '%s');
        }
        return message;
    }

    // Uruchamia ostatnią grę z zapamiętanymi graczami
    startLastGame() {
        if (this.lastGamePlayers.length === 0) {
            return; // Brak zapamiętanych graczy
        }

        // Przywróć graczy z ostatniej gry
        this.players = [...this.lastGamePlayers];

        // Wyświetl ekran gry
        document.getElementById('main-menu').classList.remove('active');
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('active');

        // Reset gry z tymi graczami
        this.resetGameWithPlayers();
    }

    // Dodanie pola do wprowadzenia nowego gracza
    addPlayerField() {
        const playerSetup = document.getElementById('player-setup');
        const playerEntries = document.querySelectorAll('.player-entry');
        const newId = playerEntries.length + 1;

        // Określ domyślną nazwę gracza w zależności od języka
        const defaultName = this.currentLanguage === 'en' ? `Player ${newId}` : `Gracz ${newId}`;
        const placeholder = this.currentLanguage === 'en' ? `Player ${newId}` : `Gracz ${newId}`;
        const removeText = this.translations[this.currentLanguage]['remove'];

        const newPlayerEntry = document.createElement('div');
        newPlayerEntry.className = 'player-entry';
        newPlayerEntry.dataset.playerId = newId;
        newPlayerEntry.innerHTML = `
            <input type="text" class="player-name" placeholder="${placeholder}" value="${defaultName}">
            <button class="remove-player" data-lang="remove">${removeText}</button>
        `;

        playerSetup.appendChild(newPlayerEntry);
        this.updatePlayerFields();
    }

    // Aktualizacja pól graczy (włączanie/wyłączanie przycisków usuwania)
    updatePlayerFields() {
        const playerEntries = document.querySelectorAll('.player-entry');
        playerEntries.forEach((entry, index) => {
            const removeButton = entry.querySelector('.remove-player');
            removeButton.disabled = playerEntries.length <= 2;

            const nameInput = entry.querySelector('.player-name');
            const playerNumber = index + 1;
            const placeholder = this.currentLanguage === 'en' ? `Player ${playerNumber}` : `Gracz ${playerNumber}`;
            nameInput.placeholder = placeholder;
        });
    }

    // Funkcja do losowego ustawiania kolejności graczy
    shufflePlayers(players) {
        // Tworzymy kopię tablicy graczy
        const shuffled = [...players];

        // Algorytm Fisher-Yates do mieszania tablicy
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }

    // Funkcja wyświetlająca kartę stołową
    displayTableCard() {
        const tableCardContainer = document.getElementById('table-card-container');

        // Wyczyść kontener
        tableCardContainer.innerHTML = '';

        // Utwórz nową kartę
        const cardHTML = this.getCardHTML(this.tableCard, this.tableSuit);
        tableCardContainer.innerHTML = cardHTML;

        // Zaloguj informację o nowej karcie
        this.log(this.formatMessage('table-card-info', this.tableCard, this.getSuitSymbol(this.tableSuit)));
    }

    // Funkcja zwracająca HTML dla karty
    getCardHTML(rank, suit) {
        return `
            <div class="card ${suit} rank-${rank}">
                <div class="flipper">
                    <div class="face">
                        <div class="suit"></div>
                        <div class="rank">${rank}</div>
                    </div>
                    <div class="back"></div>
                </div>
            </div>
        `;
    }

    // Funkcja zwracająca symbol koloru
    getSuitSymbol(suit) {
        switch (suit) {
            case 'hearts': return '♥';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'spades': return '♠';
            default: return '';
        }
    }

    // Rozpoczęcie gry
    startGame() {
        // Pobierz dane graczy
        const playerEntries = document.querySelectorAll('.player-entry');
        let players = [];

        playerEntries.forEach((entry, index) => {
            const nameInput = entry.querySelector('.player-name');
            const name = nameInput.value.trim() || (this.currentLanguage === 'en' ? `Player ${index + 1}` : `Gracz ${index + 1}`);

            players.push({
                id: index + 1,
                name: name,
                shotsPulled: this.settings.startingShots, // Użyj ustawionej liczby pociągnięć spustu
                isAlive: true,
                isWinner: false,
                winnerRank: 0,
                wasCheckedAsLiar: false
            });
        });

        // Zapisz graczy do wykorzystania w "ostatniej grze"
        this.lastGamePlayers = JSON.parse(JSON.stringify(players));

        // Losowo ustaw graczy przy stole
        this.players = this.shufflePlayers(players);

        // Resetuj licznik zwycięzców
        this.winnerCount = 0;

        // Losuj kartę stołową
        this.tableCard = this.cardTypes[Math.floor(Math.random() * this.cardTypes.length)];
        this.tableSuit = this.suits[Math.floor(Math.random() * this.suits.length)];

        // Wyświetl kartę stołową
        this.displayTableCard();

        // Ustaw pierwszego gracza
        this.currentPlayerIndex = 0;
        document.getElementById('current-player').textContent = this.players[0].name;

        // Pokaż ekran gry
        document.getElementById('setup-menu').classList.remove('active');
        document.getElementById('setup-menu').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('active');

        // Renderuj graczy
        this.renderPlayers();

        // Wyłącz przycisk wyzwania kłamcy na początku gry (domyślnie wyłączony)
        document.getElementById('challenge-liar').disabled = true;

        // Zaloguj rozpoczęcie gry
        this.log(this.formatMessage('game-started'));
        this.log(this.formatMessage('players-seated'));
        this.log(`${this.formatMessage('player-turn')} ${this.players[0].name}`);
    }

    // Renderowanie graczy
    renderPlayers() {
        const playersContainer = document.getElementById('players-container');
        playersContainer.innerHTML = '';

        // Sprawdź, czy gra się zakończyła
        const gameEnded = this.players.filter(player => player.isAlive && !player.isWinner).length <= 1;
        const allActivePlayersWon = this.players.filter(player => player.isAlive).every(player => player.isWinner);
        const gameOver = gameEnded || allActivePlayersWon;

        this.players.forEach((player, index) => {
            // Określ klasę w zależności od statusu gracza
            let statusClass = '';
            if (!player.isAlive) {
                statusClass = 'dead';
            } else if (player.isWinner) {
                statusClass = 'winner';
            } else if (gameOver) {
                // Jeśli gra się zakończyła, a gracz jest żywy ale nie wygrał - oznacza to, że przegrał
                statusClass = 'loser';
            } else if (index === this.currentPlayerIndex) {
                statusClass = 'active';
            }

            // Określ status do wyświetlenia
            let status = '';
            if (!player.isAlive) {
                status = this.currentLanguage === 'en' ? 'Dead' : 'Martwy';
            } else if (player.isWinner) {
                status = this.currentLanguage === 'en' ? `Winner #${player.winnerRank}` : `Wygrany #${player.winnerRank}`;
            } else if (gameOver) {
                // Jeśli gra się zakończyła, a gracz jest żywy ale nie wygrał - oznacz jako przegranego
                status = this.currentLanguage === 'en' ? 'Loser' : 'Przegrany';
            } else {
                status = this.currentLanguage === 'en' ? 'Alive' : 'Żyje';
            }

            const playerCard = document.createElement('div');
            playerCard.className = `player-card ${statusClass}`;
            playerCard.dataset.playerId = player.id;

            const statusText = this.currentLanguage === 'en' ? 'Status' : 'Status';
            const shotsText = this.currentLanguage === 'en' ? 'Trigger pulls' : 'Pociągnięcia spustu';
            
            playerCard.innerHTML = `
                <h3>${player.name}</h3>
                <p>${statusText}: ${status}</p>
                <p>${shotsText}: ${player.shotsPulled}/6</p>
            `;

            playersContainer.appendChild(playerCard);
        });
    }

    // Sprawdzenie, czy przycisk "Wyzwij kłamcę" powinien być aktywny
    updateChallengeButtonState() {
        const challengeButton = document.getElementById('challenge-liar');

        // Domyślnie wyłączony
        let shouldEnable = false;

        // Włącz przycisk tylko jeśli:
        // 1. Istnieje ostatnia akcja i była to zagrywka karty
        // 2. Gracz, który zagrał kartę, nie jest martwy ani nie jest zwycięzcą
        // 3. Gracz, który zagrał kartę, nie był już sprawdzany jako kłamca
        if (this.lastAction && this.lastAction.action === 'play' && this.lastAction.player) {
            const accusedPlayer = this.lastAction.player;
            shouldEnable = accusedPlayer.isAlive &&
                !accusedPlayer.isWinner &&
                !accusedPlayer.wasCheckedAsLiar;
        }

        challengeButton.disabled = !shouldEnable;
    }

    // Zagranie karty (uproszczone - bez ilości)
    playCard() {
        const currentPlayer = this.players[this.currentPlayerIndex];

        if (!currentPlayer.isAlive) {
            this.log(this.formatMessage('player-dead', currentPlayer.name));
            this.nextTurn();
            return;
        }

        if (currentPlayer.isWinner) {
            this.log(this.formatMessage('player-won', currentPlayer.name));
            this.nextTurn();
            return;
        }

        // Zapisz, że gracz zagrał kartę
        this.lastAction = {
            action: 'play',
            player: currentPlayer
        };

        this.log(this.formatMessage('played-card', currentPlayer.name));

        // Zaktualizuj stan przycisku wyzwania kłamcy
        this.updateChallengeButtonState();

        // Przejdź do następnego gracza
        this.nextTurn();
        this.renderPlayers();
    }

    // Wyzwanie kłamcy
    challengeLiar() {
        const currentPlayer = this.players[this.currentPlayerIndex];

        // Dodane sprawdzenie czy gracz nie jest martwy
        if (!currentPlayer.isAlive) {
            this.log(this.formatMessage('player-dead-challenge', currentPlayer.name));
            this.nextTurn();
            return;
        }

        if (currentPlayer.isWinner) {
            this.log(this.formatMessage('player-won-challenge', currentPlayer.name));
            this.nextTurn();
            return;
        }

        if (!this.lastAction || this.lastAction.action !== 'play') {
            this.log(this.formatMessage('cannot-challenge'));
            return;
        }

        const accusedPlayer = this.lastAction.player;

        // Sprawdź czy oskarżony gracz nie jest już zwycięzcą
        if (accusedPlayer.isWinner) {
            this.log(this.formatMessage('player-won-challenge', accusedPlayer.name));
            return;
        }

        // Sprawdź czy oskarżony gracz nie jest martwy
        if (!accusedPlayer.isAlive) {
            this.log(this.formatMessage('player-dead-challenged', accusedPlayer.name));
            return;
        }

        // Sprawdź czy oskarżony gracz nie był już sprawdzany jako kłamca
        if (accusedPlayer.wasCheckedAsLiar) {
            this.log(this.formatMessage('already-checked', accusedPlayer.name));
            return;
        }

        this.log(this.formatMessage('challenged', currentPlayer.name, accusedPlayer.name));

        // Sprawdź czy koniec gry przed wyświetleniem modala
        if (this.checkGameEnd()) {
            return;
        }

        // Tutaj należy ręcznie sprawdzić, czy gracz kłamał czy nie
        // Otwieramy modal do wyboru
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        modalContent.innerHTML = `
        <h3>${this.formatMessage('was-lying', accusedPlayer.name)}</h3>
        <button id="was-lying">${this.formatMessage('yes-lying')} [Y]</button>
        <button id="was-truthful">${this.formatMessage('no-truth')} [N]</button>
    `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.getElementById('was-lying').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.log(this.formatMessage('player-lied', accusedPlayer.name));

            // Oznacz gracza jako sprawdzonego kłamcę
            accusedPlayer.wasCheckedAsLiar = true;

            // Osoba która kłamała musi strzelać
            this.playerToShoot = accusedPlayer;
            this.currentPlayerIndex = this.players.indexOf(accusedPlayer);
            this.renderPlayers();

            // Zaktualizuj przyciski
            document.getElementById('play-card').disabled = false;
            document.getElementById('challenge-liar').disabled = true;

            // Zaktualizuj stan przycisku wyzwania kłamcy po oznaczeniu jako sprawdzonego
            this.updateChallengeButtonState();
        });

        document.getElementById('was-truthful').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.log(this.formatMessage('player-truth', accusedPlayer.name, currentPlayer.name));

            // Osoba wyzywająca musi strzelać (już jest aktualna)
            this.playerToShoot = currentPlayer;

            // Zaktualizuj przyciski
            document.getElementById('play-card').disabled = false;
            document.getElementById('challenge-liar').disabled = true;
        });
    }

    // Strzał z rewolweru
    takeShot() {
        const currentPlayer = this.playerToShoot || this.players[this.currentPlayerIndex];

        // Dodana walidacja - sprawdzenie czy gracz nie jest już martwy
        if (!currentPlayer.isAlive) {
            this.log(this.formatMessage('player-dead-shoot', currentPlayer.name));

            // Resetuj wskaźnik gracza do strzelania
            this.playerToShoot = null;

            // Zaktualizuj przyciski
            document.getElementById('play-card').disabled = false;
            document.getElementById('challenge-liar').disabled = true;

            // Przejdź do następnego gracza
            this.nextTurn();
            return;
        }

        // Zwiększ licznik pociągnięć spustu
        currentPlayer.shotsPulled++;

        // Oblicz szansę na śmierć
        const deathChances = [0.16, 0.2, 0.25, 0.33, 0.5, 1.0]; // szansa NA ŚMIERĆ
        const deathChance = deathChances[currentPlayer.shotsPulled - 1];

        // Losuj wynik
        const result = Math.random();
        const survived = result > deathChance;

        // Przygotuj modal z wynikiem
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        modalContent.innerHTML = `
        <h3>${this.formatMessage('shot-result')}</h3>
        <div class="result-display ${survived ? 'success' : 'failure'}">
            ${survived ? this.formatMessage('survived') : this.formatMessage('died')}
        </div>
        <p>${currentPlayer.name} - ${currentPlayer.shotsPulled}/6</p>
        <p>${this.formatMessage('survival-chance', Math.round((1 - deathChance) * 100))}</p>
        <button id="close-result">OK</button>
    `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.getElementById('close-result').addEventListener('click', () => {
            if (!survived) {
                currentPlayer.isAlive = false;

                // Sprawdź czy zostało tylko dwóch graczy, z których jeden właśnie zmarł
                const alivePlayers = this.players.filter(player => player.isAlive);
                const nonWinners = this.players.filter(player => !player.isWinner && player.isAlive);

                // Jeśli pozostał tylko jeden żywy gracz i nie ma jeszcze statusu zwycięzcy
                if (alivePlayers.length === 1 && nonWinners.length === 1) {
                    const lastAlivePlayer = alivePlayers[0];
                    if (!lastAlivePlayer.isWinner) {
                        this.winnerCount++;
                        lastAlivePlayer.isWinner = true;
                        lastAlivePlayer.winnerRank = this.winnerCount;
                        this.log(this.formatMessage('player-got-rid', lastAlivePlayer.name, lastAlivePlayer.winnerRank));
                    }
                }
            }

            document.body.removeChild(modal);

            if (survived) {
                this.log(this.formatMessage('player-survived', currentPlayer.name, currentPlayer.shotsPulled));
            } else {
                this.log(this.formatMessage('player-died', currentPlayer.name, currentPlayer.shotsPulled));
            }

            // Po przeżyciu/śmierci gracza, resetujemy status wasCheckedAsLiar dla wszystkich graczy
            this.players.forEach(player => {
                player.wasCheckedAsLiar = false;
            });

            // Losuj nową kartę stołową po strzale
            this.tableCard = this.cardTypes[Math.floor(Math.random() * this.cardTypes.length)];
            this.tableSuit = this.suits[Math.floor(Math.random() * this.suits.length)];

            // Wyświetl nową kartę stołową
            this.displayTableCard();

            // Resetuj wskaźnik gracza do strzelania
            this.playerToShoot = null;

            // Zaktualizuj przyciski
            document.getElementById('play-card').disabled = false;
            document.getElementById('challenge-liar').disabled = true;

            // Aktualizuj graczy
            this.renderPlayers();

            // Przejdź do następnej tury jeśli gracz nie żyje
            if (!currentPlayer.isAlive) {
                this.nextTurn();
            }

            // Sprawdź czy koniec gry
            this.checkGameEnd();
        });
    }

    // Sprawdzenie czy gra się zakończyła
    checkGameEnd() {
        // Gracze, którzy są jeszcze żywi i nie wygrali
        const activePlayers = this.players.filter(player => player.isAlive && !player.isWinner);
        
        // Wszyscy żywi gracze
        const alivePlayers = this.players.filter(player => player.isAlive);

        // Jeśli pozostał tylko jeden aktywny gracz
        if (activePlayers.length === 1) {
            const lastPlayer = activePlayers[0];
            this.log(this.formatMessage('game-over-last', lastPlayer.name));
            
            // Dezaktywuj przyciski gry
            document.getElementById('play-card').disabled = true;
            document.getElementById('challenge-liar').disabled = true;
            document.getElementById('win').disabled = true;
            
            // Dodane: Odśwież widok graczy na końcu gry
            this.renderPlayers();
            
            return true;
        } 
        // Jeśli wszyscy gracze wygrali lub są martwi
        else if (activePlayers.length === 0) {
            this.log(this.formatMessage('no-more-players'));
            
            // Dezaktywuj przyciski gry
            document.getElementById('play-card').disabled = true;
            document.getElementById('challenge-liar').disabled = true;
            document.getElementById('win').disabled = true;
            
            // Dodane: Odśwież widok graczy na końcu gry
            this.renderPlayers();
            
            return true;
        }
        
        // Jeśli został tylko jeden żywy gracz
        if (alivePlayers.length === 1) {
            const lastAlivePlayer = alivePlayers[0];
            
            // Jeśli ten gracz nie jest jeszcze zwycięzcą, uczyń go zwycięzcą
            if (!lastAlivePlayer.isWinner) {
                this.winnerCount++;
                lastAlivePlayer.isWinner = true;
                lastAlivePlayer.winnerRank = this.winnerCount;
                this.log(this.formatMessage('player-got-rid', lastAlivePlayer.name, lastAlivePlayer.winnerRank));
                
                // Zakończ grę
                this.log(this.formatMessage('game-over-last', ""));
                
                // Dezaktywuj przyciski gry
                document.getElementById('play-card').disabled = true;
                document.getElementById('challenge-liar').disabled = true;
                document.getElementById('win').disabled = true;
                
                // Dodane: Odśwież widok graczy na końcu gry
                this.renderPlayers();
                
                return true;
            }
        }
        
        return false;
    }

    // Przejście do następnej tury
    nextTurn() {
        // Najpierw sprawdź czy gra się zakończyła
        if (this.checkGameEnd()) {
            return; // Zakończ metodę jeśli gra się skończyła
        }

        // Znajdź następnego żywego gracza, który nie wygrał
        let nextPlayerIndex = this.currentPlayerIndex;
        let iterations = 0;
        const playerCount = this.players.length;

        do {
            nextPlayerIndex = (nextPlayerIndex + 1) % this.players.length;
            iterations++;

            // Zabezpieczenie przed nieskończoną pętlą
            if (iterations > playerCount) {
                this.log(this.formatMessage('no-more-players'));

                // Dezaktywuj przyciski gry
                document.getElementById('play-card').disabled = true;
                document.getElementById('challenge-liar').disabled = true;
                document.getElementById('win').disabled = true;

                return;
            }
        } while (
            (!this.players[nextPlayerIndex].isAlive ||
                this.players[nextPlayerIndex].isWinner) &&
            nextPlayerIndex !== this.currentPlayerIndex
        );

        this.currentPlayerIndex = nextPlayerIndex;
        document.getElementById('current-player').textContent = this.players[this.currentPlayerIndex].name;

        this.renderPlayers();
    }

    // Pobranie żywych graczy
    getAlivePlayers() {
        return this.players.filter(player => player.isAlive);
    }

    // Reset gry z tymi samymi graczami
    resetGameWithPlayers() {
        // Resetuj stan graczy
        this.players.forEach(player => {
            player.shotsPulled = this.settings.startingShots;
            player.isAlive = true;
            player.isWinner = false;
            player.winnerRank = 0;
            player.wasCheckedAsLiar = false; // Reset właściwości
        });

        // Resetuj licznik zwycięzców
        this.winnerCount = 0;

        // Losowo ustaw graczy przy stole
        this.players = this.shufflePlayers([...this.players]);

        // Losuj nową kartę stołową
        this.tableCard = this.cardTypes[Math.floor(Math.random() * this.cardTypes.length)];
        this.tableSuit = this.suits[Math.floor(Math.random() * this.suits.length)];

        // Wyświetl nową kartę stołową
        this.displayTableCard();

        // Resetuj indeks gracza
        this.currentPlayerIndex = 0;
        document.getElementById('current-player').textContent = this.players[0].name;

        // Resetuj stan gry
        this.lastAction = null;
        this.playerToShoot = null;

        // Zaktualizuj przyciski - Upewnij się, że stan jest poprawny na start gry/reset
        document.getElementById('play-card').disabled = false; // Główna akcja zawsze dostępna na start tury
        document.getElementById('challenge-liar').disabled = true; // Nie można wyzwać na początku tury
        document.getElementById('win').disabled = false; // Ogłoszenie zwycięzcy dostępne
        document.getElementById('reset-game').disabled = false; // Reset zawsze dostępny podczas gry

        // Renderuj graczy
        this.renderPlayers();

        // Wyczyść log
        document.getElementById('log-entries').innerHTML = '';

        // Zaloguj reset gry
        this.log(this.formatMessage('game-reset'));
        this.log(this.formatMessage('players-seated'));
        this.log(`${this.formatMessage('player-turn')} ${this.players[0].name}`);
    }

    // Reset gry z zachowaniem graczy
    resetGame() {
        this.resetGameWithPlayers();
    }

    // Zapisanie komunikatu do logu gry
    log(message) {
        const logEntries = document.getElementById('log-entries');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = message;
        logEntries.appendChild(entry);
        logEntries.scrollTop = logEntries.scrollHeight;
    }
}

// Inicjalizacja menadżera gry po załadowaniu dokumentu
document.addEventListener('DOMContentLoaded', () => {
    new GameManager();
});
