# Blueprints API - Cliente Front-end



**Cliente web interactivo para la gestión y visualización de planos arquitectónicos mediante API REST**

Este proyecto implementa un cliente front-end "grueso" que consume una API REST para la consulta, visualización y renderizado de planos arquitectónicos. Desarrollado como parte del curso de Arquitecturas de Software de la Escuela Colombiana de Ingeniería Julio Garavito.

---

## Tabla de Contenidos

- [Características Implementadas](#características-implementadas)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Archivos](#estructura-de-archivos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Componentes del Backend](#componentes-del-backend)
- [Componentes del Frontend](#componentes-del-frontend)
- [Configuración de Dependencias](#configuración-de-dependencias)
- [Pruebas y Validación](#pruebas-y-validación)

---

##  Características Implementadas

### Backend (API REST)
- **API REST completa** con Spring Boot 2.7.18
- **Controlador BlueprintAPIController** con endpoints:
  - `GET /blueprints` - Obtener todos los blueprints
  - `GET /blueprints/{author}` - Obtener blueprints por autor
  - `GET /blueprints/{author}/{name}` - Obtener blueprint específico
  - `POST /blueprints` - Crear nuevo blueprint
  - `PUT /blueprints/{author}/{name}` - Actualizar blueprint
-  **Servicio BlueprintsServices** con lógica de negocio
-  **Capa de persistencia** con interfaces y implementaciones
-  **Modelos de datos** (Blueprint, Point)
-  **Manejo de excepciones** personalizado

### Frontend (Cliente Web)
- **Interfaz HTML5** responsiva con Bootstrap 3.3.7
- **Patrón Módulo JavaScript** para encapsulación y estado privado
- **Canvas HTML5** para renderizado vectorial de planos
- **Sistema de alternancia** entre datos mock y API real
- **Estilos CSS3 personalizados** con diseño moderno
- **Integración con WebJars** para dependencias locales
- **Consulta dinámica** por autor con tabla interactiva
- **Cálculo automático** del total de puntos
- **Visualización gráfica** de planos en tiempo real

---

## Tecnologías Utilizadas

| Componente | Tecnología | Versión | Propósito |
|------------|------------|---------|-----------|
| **Backend** |
| Framework | Spring Boot | 2.7.18 | API REST y servidor web embebido |
| Lenguaje | Java | 17+ | Lógica de backend y servicios |
| Build Tool | Maven | 3.6+ | Gestión de dependencias y compilación |
| **Frontend** |
| Interfaz | HTML5 | - | Estructura y Canvas para gráficos |
| Lógica | JavaScript ES6 | - | Patrón Módulo y manejo de eventos |
| Librería DOM | jQuery | 3.1.0 | Manipulación del DOM y AJAX |
| Estilos | Bootstrap | 3.3.7 | Framework CSS y componentes UI |
| Estilos | CSS3 | - | Personalización y diseño responsivo |
| **Dependencias** |
| WebJars | webjars-locator | 0.46 | Gestión de recursos web locales |

---

##  Arquitectura del Proyecto

### Patrón Arquitectónico
```
┌─────────────────────────────────────┐
│           CLIENTE WEB               │
│  ┌─────────────┐ ┌─────────────────┐│
│  │   HTML5     │ │   JavaScript    ││
│  │ + Bootstrap │ │  (Patrón Módulo)││
│  │ + Canvas    │ │  + jQuery AJAX  ││
│  └─────────────┘ └─────────────────┘│
└─────────────────────────────────────┘
                    │ HTTP/REST
                    │ JSON
                    ▼
┌─────────────────────────────────────┐
│         SERVIDOR SPRING BOOT        │
│  ┌─────────────┐ ┌─────────────────┐│
│  │Controllers  │ │    Services     ││
│  │(REST API)   │ │ (Lógica Negocio)││
│  └─────────────┘ └─────────────────┘│
│  ┌─────────────┐ ┌─────────────────┐│
│  │Persistence  │ │     Models      ││
│  │(Data Access)│ │  (Blueprint,    ││
│  │             │ │    Point)       ││
│  └─────────────┘ └─────────────────┘│
└─────────────────────────────────────┘
```

### Flujo de Datos
```
Usuario → Formulario → app.js → apimock.js/apiclient.js → API REST
                                       ↓
Canvas ← DOM Update ← jQuery ← Callback ← JSON Response
```

---

##  Estructura de Archivos

```
LAB05ARSW/
├──  src/main/
│   ├──  java/edu/eci/arsw/
│   │   ├──  blueprints/controllers/
│   │   │   └──  BlueprintAPIController.java   
│   │   ├── blueprintsapi/
│   │   │   └──  BlueprintsAPIApplication.java
│   │   ├──  model/
│   │   │   ├──  Blueprint.java                                 
│   │   │   └──  Point.java                     
│   │   ├──  persistence/
│   │   │   ├──  BlueprintsPersistence.java     
│   │   │   ├──  BlueprintNotFoundException.java 
│   │   │   ├──  BlueprintPersistenceException.java
│   │   │   └──  impl/
│   │   │       └──  InMemoryBlueprintPersistence.java
│   │   └──  services/
│   │       └──  BlueprintsServices.java       
│   └──  resources/
│       ├── application.properties             
│       └──  static/                          
│           ├──  index.html                    
│           ├──  css/
│           │   └──  styles.css               
│           └──  js/                       
│               ├──  apiclient.js           
│               └──  apimock.js 
│               └──  app.js

├──  pom.xml                                
└──  README.md                                
```

---

##  Instalación y Ejecución

### Prerrequisitos
-  Java 17 o superior
-  Maven 3.6 o superior
-  Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Pasos de Instalación

1. **Verificar Java y Maven**
   ```bash
   java -version
   mvn -version
   ```

2. **Compilar el proyecto**
   ```bash
   mvn clean compile
   ```

3. **Ejecutar las pruebas**
   ```bash
   mvn test
   ```

4. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```

5. **Acceder a la aplicación**
   ```
   http://localhost:8080/index.html
   ```

### Verificación de la Instalación

1. **Servidor Spring Boot iniciado**: Verificar que el log muestre "Started BlueprintsAPIApplication"
2. **WebJars cargados**: Sin errores 404 en la consola del navegador
3. **Funcionalidad básica**: Cargar autores de prueba exitosamente

---

##  Uso de la Aplicación

### Flujo Completo de Usuario

#### 1. **Acceso Inicial**
- Navegar a `http://localhost:8080/index.html`
- La interfaz muestra:
  -  Formulario de consulta con campo "Author"
  -  Tabla vacía para blueprints
  -  Canvas en blanco para visualización

#### 2. **Consulta de Blueprints**
-  Ingresar nombre de autor (ej: "johnconnor", "maryweyland", "alice")
-  Hacer clic en **"Get Blueprints"**
-  El sistema ejecuta:
  ```javascript
  app.updateBlueprintsFromAuthor(authorName) →
  apimock.getBlueprintsByAuthor(author, callback) →
  Procesamiento con map() y reduce() →
  Actualización del DOM
  ```

#### 3. **Visualización de Resultados**
La tabla se llena con:
- **Nombre del blueprint**
- **Número de puntos**
- **Botón "Open"** para visualización

En la parte inferior:
-  **Total de puntos acumulados**

#### 4. **Renderizado en Canvas**
-  Hacer clic en **"Open"** junto al blueprint deseado
-  El sistema dibuja el plano como secuencia de líneas conectadas
-  Se actualiza "Current blueprint: [nombre]"

### Autores de Prueba Disponibles

| Autor | Blueprints Disponibles | Total Puntos |
|-------|----------------------|--------------|
| **johnconnor** | house, gear, complex_structure, square | 24 puntos |
| **maryweyland** | house2, gear2, building, triangle | 24 puntos |
| **alice** | office, factory | 11 puntos |

### Alternancia Mock/API Real

#### Modo Mock (Por defecto)
```html
<script src="js/apimock.js"></script>
<script src="js/app.js"></script>
```

#### Modo API Real
```html
<script src="js/apiclient.js"></script>
<script src="js/app.js"></script>
```

---

## Componentes del Backend

### 1. **BlueprintAPIController.java**
```java
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices blueprintsServices;
    
    // Endpoints implementados:
    // GET /blueprints - Todos los blueprints
    // GET /blueprints/{author} - Por autor
    // GET /blueprints/{author}/{name} - Específico
    // POST /blueprints - Crear nuevo
    // PUT /blueprints/{author}/{name} - Actualizar
}
```

### 2. **BlueprintsServices.java**
```java
@Service
public class BlueprintsServices {
    @Autowired
    BlueprintsPersistence bpp;
    
    // Métodos implementados:
    // - addNewBlueprint(Blueprint bp)
    // - getAllBlueprints()
    // - getBlueprint(String author, String name)
    // - getBlueprintsByAuthor(String author)
    // - updateBlueprint(String author, String name, Blueprint bp)
}
```

### 3. **Modelos de Datos**

#### Blueprint.java
```java
public class Blueprint {
    private String author;
    private String name;
    private List<Point> points;
    // Constructores, getters, setters
}
```

#### Point.java
```java
public class Point {
    private int x;
    private int y;
    // Constructores, getters, setters
}
```

---

## Componentes del Frontend

### 1. **index.html** - Interfaz Principal
```html
<!DOCTYPE html>
<html>
<head>
    <!-- WebJars locales -->
    <script src="/webjars/jquery/jquery.min.js"></script>
    <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Formulario de consulta -->
    <!-- Tabla de resultados -->
    <!-- Canvas para dibujo -->
</body>
</html>
```

### 2. **app.js** - Patrón Módulo JavaScript
```javascript
const app = (function() {
    // Estado privado
    let selectedAuthor = null;
    let blueprintsList = [];
    
    // Funciones privadas
    function updateBlueprintsFromAuthor(authorName) {
        // Usar apimock.getBlueprintsByAuthor()
        // Aplicar map() para transformar datos
        // Aplicar map() para generar HTML
        // Aplicar reduce() para calcular total
        // Actualizar DOM con jQuery
    }
    
    // API pública
    return {
        setAuthor: setAuthor,
        updateBlueprintsFromAuthor: updateBlueprintsFromAuthor
    };
})();
```

### 3. **apimock.js** - Datos de Prueba
```javascript
apimock = (function(){
    var mockdata = [];
    
    mockdata["johnconnor"] = [
        {author:"johnconnor", points:[...], name:"house"},
        {author:"johnconnor", points:[...], name:"gear"},
        // ... más blueprints
    ];
    
    return {
        getBlueprintsByAuthor: function(authname, callback),
        getBlueprintsByNameAndAuthor: function(authname, bpname, callback)
    };
})();
```

### 4. **apiclient.js** - Cliente API REST
```javascript
var apiclient = (function () {
    function getBlueprintsByAuthor(author, callback) {
        $.get("http://localhost:8080/blueprints/" + author, callback)
         .fail(function () {
             console.error("Error al obtener blueprints para: " + author);
         });
    }
    
    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };
})();
```

### 5. **styles.css** - Estilos Personalizados
```css
/* Diseño moderno con Bootstrap 3.3.7 */
.main-container {
    margin-top: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

#canvas {
    border: 2px solid #007bff;
    border-radius: 10px;
    background-color: #fafafa;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
```

---

##  Configuración de Dependencias

### pom.xml - Dependencias Maven
```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- WebJars -->
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
        <version>0.46</version>
    </dependency>
    
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>
    
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>
    
    <!-- Spring Boot AOP -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>
    
    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```



##  Configuración de Desarrollo

### Variables de Entorno
```properties
# application.properties
server.port=8080
logging.level.edu.eci.arsw=DEBUG
```


### Hot Reload (Opcional)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```





