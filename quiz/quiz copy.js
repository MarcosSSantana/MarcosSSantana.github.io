class QuizApp {
    constructor() {
        this.app = new PIXI.Application({
            width: 1280,
            height: 720,
            backgroundColor: 0x343a40
        });
        document.body.appendChild(this.app.view);

        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];

        this.fetchQuestions();
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

        const playText = new PIXI.Text('Descubra o seu nível de maturidade empresarial e concorra a um prêmio!', {
            fontSize: 46,
            fill: 'white',
            fontWeight: 900,
            wordWrap: true,
            wordWrapWidth: 1200,
            align: 'center'
        });
        playText.anchor.set(0.5);
        playText.x = this.app.screen.width / 2;
        playText.y = this.app.screen.height / 4;
        this.app.stage.addChild(playText);

        const startButton = this.createButton('Iniciar Quiz', -1);
        startButton.y = (this.app.screen.height / 2) - (startButton.height / 2);
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
            fontSize: 46,
            fill: 'white',
            fontWeight: 900,
            wordWrap: true,
            wordWrapWidth: 1200,
            align: 'center'
        });
        questionText.anchor.set(0.5, 0);
        questionText.x = this.app.screen.width / 2;
        questionText.y = 50;
        this.app.stage.addChild(questionText);
        this.createFadeInAnimation(questionText);

        const answersContainer = new PIXI.Container();
        answersContainer.y = questionText.y + (questionText.height) + 50;

        const buttonWidth = 180 * 3;
        const buttonHeight = 60 * 2;
        const spacing = 20; // Espaçamento entre os botões
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
        button.beginFill(0xff5722);
        button.drawRoundedRect(0, 0, 180 * 3, 60 * 2, 10);
        button.endFill();

        // Configuração do texto com word wrap
        const buttonText = new PIXI.Text(text, {
            fontSize: 24,
            fill: 'white',
            fontWeight: 400,
            wordWrap: true,
            wordWrapWidth: 180 * 3, // Largura do botão menos uma margem
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
            fontSize: 30,
            fontWeight: 600,
            fill: 'white',
            align: 'left',
            wordWrap: true,
            wordWrapWidth: 1200 // Ajuste conforme necessário
        });

        // const resultText = new PIXI.Text('Resultados', {
        //     fontSize: 46,
        //     fill: 'white',
        //     fontWeight: 900,
        //     wordWrap: true,
        //     wordWrapWidth: 1200,
        //     align: 'center'
        // });

        resultText.anchor.set(0.5, 0);
        resultText.x = this.app.screen.width / 2;
        resultText.y = 50;
        this.app.stage.addChild(resultText);

        /*this.userAnswers.forEach((answer, index) => {
            if (index < this.questions.length) {
                const answerText = new PIXI.Text(`Pergunta ${index + 1}: ${this.questions[index].respostas[answer]}`, {
                    fontSize: 24,
                    fill: 'white'
                });
                answerText.anchor.set(0.5);
                answerText.x = this.app.screen.width / 2;
                answerText.y = (index + 1) * 40 + (resultText.y + resultText.height);
                this.app.stage.addChild(answerText);
                this.createFadeInAnimation(answerText);
            }
        });*/


        const restartButton = this.createButton('Reiniciar Quiz', -1);
        restartButton.y = 530;
        restartButton.x = (this.app.screen.width / 2) - (restartButton.width / 2);
        restartButton.on('pointerdown', () => this.restartQuiz());
        this.app.stage.addChild(restartButton);

        this.createFadeInAnimation(restartButton);
    }

    getMaturityLevelMessage() {
        const { userAnswers } = this;

        // Contadores para as opções
        let countA = 0;
        let countB = 0;
        let countC = 0;
        let countD = 0;
        let countE = 0;

        // Contar as respostas
        userAnswers.forEach(answer => {
            switch (answer) {
                case 0: countA++; break;
                case 1: countB++; break;
                case 2: countC++; break;
                case 3: countD++; break;
                case 4: countE++; break;
            }
        });

        // Lógica para determinar o nível de maturidade
        if (countA + countE > countB + countC + countD) {
            return "Nível 1: Maturidade Inicial\n\n" +
                "Se o empresário escolheu majoritariamente as opções A e E, a empresa está em um nível inicial de maturidade em gestão e uso de dados. O processo de previsão de demanda é baseado em métodos tradicionais, como séries históricas, ou até mesmo em intuições da equipe comercial, sem a integração de análises preditivas avançadas. O controle de estoque e alocação de colaboradores é feito de forma manual ou por planilhas, o que limita a eficiência e a capacidade de responder rapidamente às demandas do mercado. A assertividade na previsão de demanda provavelmente está abaixo de 50%, e o uso de dados para tomada de decisão ainda é mínimo, com pouca ou nenhuma tecnologia avançada aplicada.";
        } else if (countB + countC > countA + countD + countE) {
            return "Nível 2: Maturidade Intermediária\n\n" +
                "Se o empresário escolheu predominantemente as opções B e C, a empresa possui um nível intermediário de maturidade em gestão e uso de dados. Já existe um uso mais sofisticado de dados, como a aplicação de ferramentas preditivas em áreas específicas e a implementação de sistemas digitais básicos para controle de estoque e alocação de colaboradores. A previsão de demanda tem uma assertividade entre 50% e 70%, o que demonstra uma evolução no processo, mas ainda há espaço para melhorias significativas, especialmente na integração e automatização das soluções. A empresa utiliza dados para suporte à decisão, mas ainda de forma pontual, sem uma visão completamente integrada.";
        } else if (countC + countD > countA + countB + countE) {
            return "Nível 3: Maturidade Avançada\n\n" +
                "Se o empresário escolheu majoritariamente as opções C e D, a empresa atingiu um nível avançado de maturidade em gestão e uso de dados. O uso de análises preditivas avançadas e plataformas integradas que automatizam processos de abastecimento, previsão de demanda e alocação de colaboradores indica que a empresa está na vanguarda da gestão baseada em dados. A assertividade na previsão de demanda é superior a 70%, e a empresa otimiza suas decisões em tempo real, utilizando dados de desempenho e demanda. As decisões são altamente orientadas por análises de dados avançadas, resultando em uma operação ágil, eficiente e adaptável.";
        }

        return "Nenhum nível de maturidade claramente identificado. Considere rever as respostas.";
    }

    restartQuiz() {
        this.fetchQuestions();
    }

    showError(message) {
        this.app.stage.removeChildren();

        const errorText = new PIXI.Text(message, {
            fontSize: 24,
            fill: 'white',
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
