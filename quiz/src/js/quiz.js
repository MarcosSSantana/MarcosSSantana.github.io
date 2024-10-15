class QuizApp {
    constructor() {
        this.loadConfig().then(() => {
            this.app = new PIXI.Application({
                width: this.config.app.width,
                height: this.config.app.height,
                backgroundColor: this.config.app.backgroundColor
            });
            document.body.appendChild(this.app.view);

            this.questions = [];
            this.currentQuestionIndex = 0;
            this.userAnswers = [];

            this.fetchQuestions();
        });
    }

    async loadConfig() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar configurações: ' + response.statusText);
            }
            this.config = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async fetchQuestions() {
        try {
            const response = await fetch('questions.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar perguntas: ' + response.statusText);
            }
            this.questions = await response.json();
            this.showPlayScreen();
        } catch (error) {
            this.showError(error.message);
        }
    }

    showPlayScreen() {
        this.app.stage.removeChildren();


        // Adicionando uma imagem
        const imageUrl = 'src/img/logo.png';
        const texture = PIXI.Texture.from(imageUrl);
        const imageSprite = new PIXI.Sprite(texture);

        // Centralizando a imagem na tela
        imageSprite.anchor.set(0.5);
        imageSprite.x = this.app.screen.width / 2;
        imageSprite.y = this.app.screen.height / 4;

        this.app.stage.addChild(imageSprite);

        const playText = new PIXI.Text(this.config.text.playScreen.content, {
            fontSize: this.config.text.playScreen.fontSize,
            fill: this.config.text.playScreen.fill,
            fontWeight: this.config.text.playScreen.fontWeight,
            wordWrap: true,
            wordWrapWidth: this.config.text.playScreen.wordWrapWidth,
            align: 'center'
        });

        playText.anchor.set(0.5);
        playText.x = this.app.screen.width / 2;
        playText.y = imageSprite.y + 221;
        this.app.stage.addChild(playText);
        console.log(playText.y + playText.height);

        const startButton = this.createButton(this.config.text.startButton, -1);
        startButton.y = playText.y + playText.height;
        startButton.x = (this.app.screen.width / 2) - (startButton.width / 2);
        startButton.on('pointerdown', () => this.startQuiz());

        this.app.stage.addChild(startButton);
        this.createFadeInAnimation(startButton);
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.showQuestion();
    }

    showQuestion() {
        this.app.stage.removeChildren();

        const question = this.questions[this.currentQuestionIndex];

        const questionText = new PIXI.Text(question.pergunta, {
            fontFamily: "Urbanist",
            fontSize: this.config.text.question.fontSize,
            fill: this.config.text.question.fill,
            fontWeight: this.config.text.question.fontWeight,
            wordWrap: true,
            wordWrapWidth: this.config.text.question.wordWrapWidth,
            align: 'center'
        });
        questionText.anchor.set(0.5, 0);
        questionText.x = this.app.screen.width / 2;
        questionText.y = 50;
        this.app.stage.addChild(questionText);
        this.createFadeInAnimation(questionText);

        const answersContainer = new PIXI.Container();
        answersContainer.y = questionText.y + (questionText.height) + this.config.spacing.answers;

        const buttonWidth = this.config.button.width;
        const buttonHeight = this.config.button.height;
        const spacing = this.config.spacing.button; // Espaçamento entre os botões
        const columnCount = 2; // Número de colunas

        question.respostas.forEach((resposta, index) => {
            const button = this.createButton(resposta, index);
            const column = index % columnCount; // Coluna (0 ou 1)
            const row = Math.floor(index / columnCount); // Linha

            // Calcular a posição dos botões
            button.x = (this.app.screen.width / 2 - (columnCount * (buttonWidth + spacing)) / 2) + (column * (buttonWidth + spacing));
            button.y = row * (buttonHeight + spacing);

            answersContainer.addChild(button);
        });

        this.app.stage.addChild(answersContainer);
    }

    createButton(text, index) {
        const button = new PIXI.Graphics();
        button.beginFill(this.config.button.color);
        button.drawRoundedRect(0, 0, this.config.button.width, this.config.button.height, 10);
        button.endFill();

        // Configuração do texto com word wrap
        const buttonText = new PIXI.Text(text, {
            fontFamily: "Urbanist",
            fontSize: this.config.text.button.fontSize,
            fill: this.config.text.button.fill,
            fontWeight: this.config.text.button.fontWeight,
            wordWrap: true,
            wordWrapWidth: this.config.button.width, // Largura do botão menos uma margem
            align: 'center'
        });

        buttonText.anchor.set(0.5);
        buttonText.x = button.width / 2; // Centraliza horizontalmente
        buttonText.y = button.height / 2; // Centraliza verticalmente
        button.addChild(buttonText);

        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', () => this.selectAnswer(index));

        return button;
    }

    selectAnswer(answerIndex) {
        this.userAnswers[this.currentQuestionIndex] = answerIndex;

        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.app.stage.removeChildren();

        const maturityMessage = this.getMaturityLevelMessage();
        const resultText = new PIXI.Text(maturityMessage, {
            fontFamily: "Urbanist",
            fontSize: this.config.text.result.fontSize,
            fontWeight: this.config.text.result.fontWeight,
            fill: this.config.text.result.fill,
            align: 'left',
            wordWrap: true,
            wordWrapWidth: this.config.text.result.wordWrapWidth // Ajuste conforme necessário
        });

        resultText.anchor.set(0.5, 0);
        resultText.x = this.app.screen.width / 2;
        resultText.y = 50;
        this.app.stage.addChild(resultText);

        const restartButton = this.createButton(this.config.text.restartButton, -1);
        restartButton.y = 530;
        restartButton.x = 33.75;
        restartButton.on('pointerdown', () => this.restartQuiz());
        this.app.stage.addChild(restartButton);

        this.createFadeInAnimation(restartButton);

        const formButton = this.createButton("Início", -1);
        formButton.y = 530;
        formButton.x = 640 + 67.5;
        formButton.on('pointerdown', () => window.location.replace("../index.html"));
        this.app.stage.addChild(formButton);

        this.createFadeInAnimation(formButton);
    }

    getMaturityLevelMessage() {
        const { userAnswers } = this;

        // Contadores para as opções
        let countA = 0;
        let countB = 0;
        let countC = 0;
        let countD = 0;
        // let countE = 0;

        // Contar as respostas
        userAnswers.forEach(answer => {
            switch (answer) {
                case 0: countA++; break;
                case 1: countB++; break;
                case 2: countC++; break;
                case 3: countD++; break;
                // case 4: countE++; break;
            }
        });

        // Lógica para determinar o nível de maturidade
        if (countA + countD > countB + countC) {
            return "Nível 1: Maturidade inicial\n\n" +
                "A sua empresa está em um nível inicial de maturidade em gestão e uso de dados. O processo de previsão de demanda ainda não utiliza ferramentas avançadas e preditivas.\n\n O controle de estoque e alocação de colaboradores é feito de forma manual ou por planilhas, o que limita a eficiência e a capacidade de responder rapidamente às demandas do mercado.\n\n A previsão de demanda pode ser mais eficaz ao unir dados e IA, o que garante assertividade. ";
        } else if (countB > countA + countD) {
            return "Nível 2: Maturidade intermediária\n\n" +
                "A sua empresa possui um nível intermediário de maturidade em gestão e uso de dados, como a aplicação de ferramentas preditivas em áreas específicas e a implementação de sistemas digitais básicos para controle de estoque e alocação de colaboradores.\n\n A empresa utiliza dados para suporte à decisão, mas ainda de forma pontual, sem uma visão completamente integrada.\n\n Ainda há espaço para melhorias significativas, especialmente na integração e automatização das soluções.";
        } else if (countC > countA + countB) {
            return "Nível 3: Maturidade avançada\n\n" +
                "A sua empresa já está em um nível avançado de maturidade em gestão e uso de dados. O uso de análises preditivas e plataformas integradas que automatizam processos de abastecimento já fazem parte da rotina.\n\n Geralmente, as decisões são orientadas por análises de dados avançadas, resultando em uma operação ágil, eficiente e adaptável.\n\n Continue acompanhando as atualizações do mercado para garantir uma operação assertiva e eficaz.";
        }

        return "Nenhum nível de maturidade claramente identificado. Considere rever as respostas.";
    }

    restartQuiz() {
        this.fetchQuestions();
    }

    showError(message) {
        this.app.stage.removeChildren();

        const errorText = new PIXI.Text(message, {
            fontFamily: "Urbanist",
            fontSize: this.config.text.error.fontSize,
            fill: this.config.text.error.fill,
            align: 'center'
        });
        errorText.anchor.set(0.5);
        errorText.x = this.app.screen.width * 0.5;
        errorText.y = this.app.screen.height * 0.5;
        this.app.stage.addChild(errorText);
    }

    createFadeInAnimation(element) {
        element.alpha = 0; // Começa invisível
        this.app.ticker.add(() => {
            if (element.alpha < 1) {
                element.alpha += 0.02; // Aumenta a opacidade
            }
        });
    }
}

const quizApp = new QuizApp();
