/// <reference path="../types/global.d.ts" />

import colors from 'colors';


// Configuración del tema: combina color, italic y demás estilos deseados
colors.setTheme({
    info: ['cyan', 'italic'],
    warn: ['yellow', 'italic'],
    error: ['red', 'underline'],
    log: ['brightGreen', 'italic'],
  });
  

// Guarda las referencias originales
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
const originalInfo = console.info;

// Función auxiliar para aplicar el estilo solo si el argumento es una cadena
const applyStyle = (arg: any, styleFn: (str: string) => string) =>
  typeof arg === 'string' ? styleFn(arg) : arg;

// Reemplaza console.log
console.log = (...args: any[]) => {
    const prefix = "[LOG] ".log; // Aplica el estilo 'info' al prefijo
    const styledArgs = args.map(arg => applyStyle(arg, (str) => str.log));
    originalLog.apply(console, [prefix, ...styledArgs]);
  };
  
  console.info = (...args: any[]) => {
    const prefix = "[INFO] ".info;
    const styledArgs = args.map(arg => applyStyle(arg, (str) => str.info));
    originalInfo.apply(console, [prefix, ...styledArgs]);
  };
  
  console.warn = (...args: any[]) => {
    const prefix = "[WARN] ".warn;
    const styledArgs = args.map(arg => applyStyle(arg, (str) => str.warn));
    originalWarn.apply(console, [prefix, ...styledArgs]);
  };
  
  console.error = (...args: any[]) => {
    const prefix = "[ERROR] ".error;
    const styledArgs = args.map(arg => applyStyle(arg, (str) => str.error));
    originalError.apply(console, [prefix, ...styledArgs]);
  };

