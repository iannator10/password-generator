var app = new Vue({
    el: "#app",
    name: "password generator",
    data: {
        charRange: '',
        charNum: null,
        inUpperCase: false,
        inNum: false,
        inSymbols: false,
        UPPERCASE_CHAR_CODES: [],
        LOWERCASE_CHAR_CODES: [],
        NUMBER_CHAR_CODES: [],
        SYMBOL_CHAR_CODES: [],
        passwordCharacters: []
    },
    watch: {
        charRange: function(val) {
            const self = this;

            self.charNum = val
        },
        charNum: function(val) {
            const self = this;

            self.charRange = val
        }
    },
    mounted() {
        const self = this;

        self.charRange = 10
    },
    methods: {
        submit: function() {
            const self = this
            event.preventDefault();

            self.UPPERCASE_CHAR_CODES = self.arrayFromLowtoHigh(65, 90);
            self.LOWERCASE_CHAR_CODES = self.arrayFromLowtoHigh(97, 122);
            self.NUMBER_CHAR_CODES = self.arrayFromLowtoHigh(48, 57);
            self.SYMBOL_CHAR_CODES = self.arrayFromLowtoHigh(33, 47).concat(
                self.arrayFromLowtoHigh(58, 64) 
            ).concat(
                self.arrayFromLowtoHigh(91, 96)
            ).concat(
                self.arrayFromLowtoHigh(123, 126)
            );

            let charCodes = self.LOWERCASE_CHAR_CODES;

            if (self.inUpperCase) {
                charCodes = charCodes.concat(self.UPPERCASE_CHAR_CODES)
            }
            if (self.inNum) {
                charCodes = charCodes.concat(self.NUMBER_CHAR_CODES)
            }
            if (self.inSymbols) {
                charCodes = charCodes.concat(self.SYMBOL_CHAR_CODES)
            }

            let passArray = [];
            for (let i = 0; i <= self.charNum; i++) {
                const character = charCodes[Math.floor(Math.random() * charCodes.length)]
                passArray.push(String.fromCharCode(character))
                
            }

            self.passwordCharacters = passArray.join('');
        },
        arrayFromLowtoHigh: function (low, high) {
            let array = [];

            for (let i = low; i <= high; i++) {
                array.push(i);
            }

            return array;
        },
        copyToClipboard: function () {
            const self = this;
            self.$refs.inputVal.select()
            document.execCommand('copy');
        }
    }
})