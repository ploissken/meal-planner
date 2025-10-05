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

# 🧠 AI Usage Documentation

#### Tools Used

ChatGPT was user for scaffolding components, generating boilerplate logic, writing utility functions, creating mock data and unitary tests. With the exception of utility functions, all the other uses are detailed thru commentaries on the code or README files on the root folder.

# 🧱 Architecture Decisions

#### Reasoning

I've spent a couple hours on system design prior to implementation, identifying main user and system features, sketching wireframes, interactions an designing data.

I chose **Next.js** due to its powerful routing, image handling and file infrastructure, and **MUI** for its extent library of components and icons (and I also appreciate material design).

Code was created with a component-first design approach, respecting patterns like separation of concerns, encapsulation, and high abstraction, to enforce reusability, scalability, and testability.

#### Frameworks & Tools

- **React + Next**: Fast dev environment and modern module bundling.
- **TypeScript**: Ensures type safety and better IDE support.
- **MUI**: For rapid, consistent UI styling with material design.
- **React Context**: Lightweight state management.
- **Jest & Testing-Library**: For easy testing components.

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

Knowing AI-generated code often lack cohesion, I used it to generate very simple components and boilerplates, where I could build on top with minimun friction.
I also ask often for code reviews of components, specially when I feel something is off. This usually gives very good insight into readability improvements.

#### 2. Responsive Design

Ensuring mobile responsiveness with data-full UI is always an interesting challenge. Starting with wireframes and using **MUI** spared me _a lot_ of trouble.

#### 3. Data Management

Handling mocked data updates was likely the trickiest part, and I could have done a better job. For simplicity and due to time constraints, I opted to implement a full reset on the shopping list if any change occurs in meal planner, which I see as a bad user experience.

# 🛠️ What I’d Do with More Time

#### Better mock data and next/image leverage

Mocking images could have been better polished. Next/Image is incredibly powerful, but requires some configuration I wouldn't have time to, so I've used html `<img>` instead, and repeated images which are a bummer.

#### Better data design and state management

I could have had designed the shopping list better. I've given a proportionally smaller time to this feature design. Ideally, ingredients once marked as owned should not show up there again, but the time constraints would not allow me to a full refactor, so I opted to reset the whole ingredients list whenever the week meal plan changes.

#### Testing

Test typing was highly overlooked.

#### User experience

- Loading state is working fine on recipe gallery, but not so on meal planner and shopping list, which misses loading indicators.
- Aria was highly overlooked. There is even a warning pop on console when some modals close. It feels like some odd behavior on MUI's side, but I didn't explore it further.
- Nutritional data on day plan could have some better labeling, like "missing carbs". Currently feeling too raw.
- Instruction timers are missed if the user closes the dialog. At first I intended to create a more reliable system, with toast notifications when timer is complete but, yeah.
- List items on shopping list, as well as chips on daily planner, could use some in/out animation.

# 📬 Contact

If you'd like to reach out with feedback or questions:

[Rodrigo Souza](https://www.linkedin.com/in/rodrigo-souza-97302724/)
