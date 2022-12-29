import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Upserts a new subject named "Mathématiques"
	const math = await prisma.subject.upsert({
		where: { slug: 'maths' },
		update: {},
		create: { name: 'Mathématiques', slug: 'maths', desc: 'Les origines des sciences !' }
	});

	// Upserts new cards related to the subject "Mathématiques"
	const card_rookie_math = await prisma.card.upsert({
		where: { name: 'Le rookie des mathématiques' },
		update: {},
		create: {
			name: 'Le rookie des mathématiques',
			desc: 'Donnée au débutant des maths',
			subjectId: math.id,
			minPoints: 0
		}
	});

	const english = await prisma.subject.upsert({
		where: { slug: 'english' },
		update: {},
		create: {
			name: 'English',
			slug: 'english',
			desc: "L'anglais, la langue ancestrale de la magie !"
		}
	});

	// Upserts new cards related to the subject "Mathématiques"
	const card_rookie_english = await prisma.card.upsert({
		where: { name: 'Le rookie de la langues mystique!' },
		update: {},
		create: {
			name: 'Le rookie de la langues mystique!',
			desc: "Donnée au débutant de l'anglais",
			subjectId: english.id,
			minPoints: 0
		}
	});

	const card_intermediate_math = await prisma.card.upsert({
		where: { name: 'Le mathématicien intermédiaire' },
		update: {},
		create: {
			name: 'Le mathématicien intermédiaire',
			desc: 'Donnée au mathématicien intermédiaire',
			subjectId: math.id,
			minPoints: 1
		}
	});

	// Upserts a new subject named "Smalltalk"
	const smalltalk = await prisma.subject.upsert({
		where: { slug: 'smalltalk' },
		update: {},
		create: {
			name: 'Smalltalk',
			slug: 'smalltalk',
			desc: 'Le langage de programmation le plus simple du monde !'
		}
	});

	const card_smalltalk = await prisma.card.upsert({
		where: { name: 'La réponse à la vie' },
		update: {},
		create: {
			name: 'La réponse à la vie',
			desc: "En commencant l'étude du langage originel, vous sentez toutes les connaissances du monde vous envahir !",
			subjectId: smalltalk.id,
			minPoints: 1
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})

	.catch(async (e) => {
		console.error(e);

		await prisma.$disconnect();

		process.exit(1);
	});
