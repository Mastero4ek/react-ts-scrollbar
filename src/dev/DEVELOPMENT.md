# Руководство по публикации в npm

## 📋 Пошаговая инструкция

### 1. Подготовка к публикации

#### 1.1 Проверка изменений

```bash
# Проверить статус git
git status

# Посмотреть изменения
git diff
```

#### 1.2 Фиксация изменений

```bash
# Добавить все изменения
git add .

# Создать коммит с описательным сообщением
git commit -m "feat: добавил новые пропсы barTransition и thumbTransition"

# Отправить изменения в репозиторий
git push origin dev
```

### 2. Обновление версии

#### 2.1 Автоматическое обновление (рекомендуется)

```bash
# Обновить patch версию (1.0.0 → 1.0.1)
npm version patch

# Обновить minor версию (1.0.0 → 1.1.0)
npm version minor

# Обновить major версию (1.0.0 → 2.0.0)
npm version major
```

#### Семантическое версионирование

- **MAJOR** (2.0.0): Несовместимые изменения API
- **MINOR** (1.1.0): Новая функциональность, обратно совместимая
- **PATCH** (1.0.1): Исправления багов, обратно совместимые

#### 2.2 Ручное обновление

```bash
# Отредактировать package.json вручную
# "version": "1.2.0"

# Зафиксировать изменения версии
git add package.json
git commit -m "chore: bump version to 1.2.0"
```

### 3. Сборка пакета

#### 3.1 Автоматическая сборка

```bash
# Сборка выполняется автоматически через prepack хук
npm run build
```

#### 3.2 Проверка сборки

```bash
# Проверить содержимое пакета без публикации
npm pack --dry-run

# Убедиться, что все файлы включены
ls -la dist/
```

### 4. Публикация в npm

#### 4.1 Проверка авторизации

```bash
# Проверить текущего пользователя
npm whoami

# Если не авторизованы, выполнить вход
npm login
```

#### 4.2 Публикация

```bash
# Опубликовать пакет
npm publish

# Для публикации с конкретным тегом
npm publish --tag beta
```

### 5. Создание тегов в git

#### 5.1 Создание тега

```bash
# Создать тег для текущей версии
git tag v1.2.0

# Отправить теги в репозиторий
git push origin dev --tags
```

### 6. Проверка публикации

#### 6.1 Проверка в npm

```bash
# Проверить текущую версию пакета
npm view react-typescript-scrollbar version

# Посмотреть информацию о пакете
npm view react-typescript-scrollbar

# Посмотреть все версии
npm view react-typescript-scrollbar versions
```

#### 6.2 Тестирование установки

```bash
# Создать тестовую папку
mkdir test-install
cd test-install

# Установить пакет
npm init -y
npm install react-typescript-scrollbar

# Проверить, что пакет установился
ls node_modules/react-typescript-scrollbar/
```

## 🔧 Полезные команды

### Отладка

```bash
# Посмотреть логи npm
npm config get registry

# Очистить кэш npm
npm cache clean --force

# Проверить права доступа
npm access ls-packages
```

## ⚠️ Важные моменты

### Файлы для публикации

Убедитесь, что в `package.json` правильно указаны:

```json
{
	"files": ["dist", "README.md", "README.ru.md"],
	"main": "./dist/cjs/index.js",
	"module": "./dist/esm/index.mjs",
	"types": "./dist/types/index.d.ts"
}
```

### Проверка перед публикацией

- [ ] Все изменения зафиксированы в git
- [ ] Версия обновлена в package.json
- [ ] Пакет собирается без ошибок
- [ ] README обновлен

## 🚨 Решение проблем

### Ошибка "Invalid version"

```bash
# Убедитесь, что версия соответствует semver
# Правильно: "1.2.0"
# Неправильно: "1.2"
```

### Ошибка "Package already exists"

```bash
# Обновите версию в package.json
npm version patch
```

### Ошибка авторизации

```bash
# Войдите в npm
npm login

# Проверьте права доступа
npm access ls-packages
```

## 📚 Дополнительные ресурсы

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm publish](https://docs.npmjs.com/cli/v8/commands/npm-publish)
