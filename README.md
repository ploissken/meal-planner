# 🚀 Project Setup

#### Prerequisites

- Node.js >= 18.x
- npm or yarn

#### Installation

```
git clone https://github.com/ploissken/meal-planner.git
cd meal-planner
npm install
```

#### Running Locally

```
npm run dev
```

The app will run locally at http://localhost:3000

#### Running Tests

```
npm run test
```

# 🧠 AI Usage

ChatGPT was used for scaffolding components, generating boilerplate logic, writing utility functions (or parts of it), creating mock data, and writing unit tests. With the exception of utility functions, all other AI-generated code is annotated in comments or documented in README files at the root folder.

# 🧱 Architecture Decisions

#### Reasoning

Before implementation, I spent a few hours planning the system design: identifying key features, sketching wireframes, mapping user interactions, and defining data models.

I chose **Next.js** due to its powerful routing, image handling and file infrastructure, and **MUI** for its extensive component library and alignment with Material Design (which I personally enjoy working with).

The code follows a component-first approach and applies software design principles like separation of concerns, encapsulation, and abstraction to support reusability, scalability, and testability.

#### Frameworks & Tools

- **React + Next**: Fast dev environment and modern module bundling.
- **TypeScript**: Ensures type safety and better IDE support.
- **MUI**: For rapid, consistent UI styling with material design.
- **React Context**: Lightweight state management.
- **Jest & Testing-Library**: For unit testing UI and logic.

#### Folder Structure

Tests are co-located for better discoverability and scoping.

```
src/
├── mock-data/          # Recipe and ingredient mocks
└── app/                # App source
    ├── components/     # Reusable UI components
    ├── context/        # For state management
    ├── hooks/          # For shared logic
    ├── meal-planner/   # Meal Planner page and components
    ├── recipe-gallery/ # Recipe Gallery page and components
    └── shopping-list/  # Shopping List page and components
```

# 🧩 Challenges & Solutions

#### 1. AI Code Integration

AI-generated code often lacks cohesion. To minimize friction, I used AI primarily for generating simple components and boilerplates, which I then refined manually. I also regularly requested code reviews from the model when something felt "off," which proved helpful for improving readability and structure.

#### 2. Responsive Design

Ensuring a mobile-friendly UI with dense data can be challenging. Starting with wireframes and using **MUI** spared me _a lot_ of trouble thanks to its responsive grids and styling sugar.

#### 3. Data Management

Keeping the shopping list in sync with the meal plan was one of the trickier aspects. Due to time constraints, I implemented a full reset of the shopping list whenever the meal plan changes. While functional, this is not ideal from a UX perspective.

# 🛠️ What I’d Do with More Time

#### Better mock data and next/image leverage

Images were repeated and not well-optimized. I initially intended to use `next/image`, but configuring it properly would have taken more time than I had. As a result, I fell back on native `<img>` tags.

#### Better data design and state management

The shopping list design was rushed compared to the other features. Ideally, ingredients once marked as "owned" would not reappear on meal plan changes, but the time constraints made me opt for a simples implementation, resetting the whole ingredients list on every update.

#### Testing

Test typing was highly overlooked.

#### User experience

- Loading indicators are working in the recipe gallery, but missing in the meal planner and shopping list views.
- Aria was highly overlooked. There is even a warning pop on console when some modals close. It feels like some odd behavior on MUI's side, but I didn't explore it further.
- Nutritional informations in the day plan are too raw (e.g., labels like “missing carbs” could be clearer).
- Instruction timers are lost if the dialog is closed. I originally planned to notify users via toast when a timer finished but...
- Shopping list items and planner chips could benefit from in/out animations for a more dynamic experience.

# 📬 Contact

If you'd like to reach out with feedback or questions:

[Rodrigo Souza](https://www.linkedin.com/in/rodrigo-souza-97302724/)
