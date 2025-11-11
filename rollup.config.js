import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
// ИСПРАВЛЕНИЕ: Импортируем terser как экспорт по умолчанию (без фигурных скобок)
import terser from '@rollup/plugin-terser'; 

const extensions = ['.js', '.jsx'];

export default [
    // Конфигурация для клиентской части
    {
        input: 'src/client.jsx',
        output: {
            file: 'public/js/client.js',
            format: 'iife',
            name: 'clientBundle',
            sourcemap: false
        },
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env', '@babel/preset-react']
            }),
            // Вызов плагина остается прежним
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
            sourcemap: false
        },
        plugins: [
            resolve({ extensions }),
            commonjs(),
            babel({
                extensions,
                babelHelpers: 'bundled',
                presets: ['@babel/preset-env', '@babel/preset-react']
            }),
            // Вызов плагина остается прежним
            terser({ compress: { drop_console: false } }) 
        ]
    }
];
