import { de } from './src/i18n/de';
import { en } from './src/i18n/en';
import { fr } from './src/i18n/fr';

function getPaths(obj: any, prefix = ''): string[] {
    let paths: string[] = [];
    for (let key in obj) {
        let newPath = prefix ? prefix + '.' + key : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            paths = paths.concat(getPaths(obj[key], newPath));
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any, index: number) => {
                if (typeof item === 'object') {
                    paths = paths.concat(getPaths(item, newPath + '[' + index + ']'));
                } else {
                    paths.push(newPath + '[' + index + ']');
                }
            });
        } else {
            paths.push(newPath);
        }
    }
    return paths;
}

const dePaths = getPaths(de);
const enPaths = getPaths(en);
const frPaths = getPaths(fr);

console.log('--- Missing in EN ---');
dePaths.filter(p => !enPaths.includes(p)).forEach(p => console.log(p));
console.log('--- Missing in FR ---');
dePaths.filter(p => !frPaths.includes(p)).forEach(p => console.log(p));

console.log('--- Missing in DE (but in EN or FR) ---');
enPaths.filter(p => !dePaths.includes(p)).forEach(p => console.log('EN: ' + p));
frPaths.filter(p => !dePaths.includes(p)).forEach(p => console.log('FR: ' + p));

// Content diffs
console.log('\n--- Content Mismatches ---');
console.log('Comparing EN to DE mapping logic/structure:');

// Actually it's hard to compare content directly, we just visually do it.
