import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser'; 

const extensions = ['.js', '.jsx'];

const externalDependencies = ['react', 'react-dom'];

// 🟢 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Карта глобальных имен для внешних зависимостей
const globals = {
    // Говорим Rollup, что импорт 'react' должен ссылаться на глобальную 'React'
    'react': 'React',
    // Говорим Rollup, что импорт 'react-dom' должен ссылаться на глобальную 'ReactDOM'
    'react-dom': 'ReactDOM' 
};

export default [
    // Конфигурация для клиентской части
    {
        input: 'src/client.jsx',
        output: {
            file: 'public/js/client.js',
            format: 'iife',
            name: 'clientBundle',
            sourcemap: false,
            globals: globals // <-- ОБЯЗАТЕЛЬНОЕ ДОПОЛНЕНИЕ!
        },
        external: externalDependencies, 
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env', '@babel/preset-react']
            }),
            terser({ compress: { drop_console: false } }) 
        ]
    },
    // Конфигурация для админ-панели
    {
        input: 'src/admin.jsx',
        output: {
            file: 'public/js/admin.js',
            format: 'iife',
            name: 'adminBundle',
            sourcemap: false,
            globals: globals // <-- ОБЯЗАТЕЛЬНОЕ ДОПОЛНЕНИЕ!
        },
        external: externalDependencies, 
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env', '@babel/preset-react']
            }),
            terser({ compress: { drop_console: false } }) 
        ]
    }
];
