<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Language;
use App\Repository\ProductRepository;
use App\Repository\LanguageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;

class LanguageController extends AbstractController
{
    #[OA\Response(
        response: 200,
        description: 'Cette méthode permet de récupérer les langues',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Language::class))
        )
    )]
    #[OA\Tag(name: 'Language')]
    #[Route('/api/language', name: 'app_language', methods: ['GET'])]
    public function getLanguage(LanguageRepository $languageRepository, SerializerInterface $serializer): JsonResponse
    {
        $language = $languageRepository->findAll();
        $jsonLanguage = $serializer->serialize($language, 'json');
        return new JsonResponse($jsonLanguage, Response::HTTP_OK,[], true);
    }

    #[OA\Response(
        response: 200,
        description: 'Cette méthode permet de récupérer un langage',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Language::class, groups: ['getLanguage']))
        )
    )]
    #[OA\Tag(name: 'Language')]
    #[Route('/api/language/{id}', name: 'detailLanguage', methods: ['GET'])]
    public function getDetailLanguage(SerializerInterface $serializer, Language $language): JsonResponse
    {
            $jsonLanguage = $serializer->serialize($language,'json');
            return new JsonResponse($jsonLanguage, Response::HTTP_OK, ['accept' => 'json'], true);
    }


    #[Route('/api/language', name:'createLanguage', methods: ['POST'])]
    #[OA\Post(
        path:"/api/language",
        summary: "Crée une langue",
        tags: ["Language"],
        requestBody: new OA\RequestBody(
            description: "Crée une langue",
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: Language::class)
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description:"La langue a bien été créée",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(property:"nom", type:"string"),
                    ])),
                new OA\Response(
                    response: 400,
                    description: "La requête est incorrecte")
        ]
    )]
    #[OA\Tag(name:"Language")]
        public function createLanguage(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
        {
            $language = $serializer->deserialize($request->getContent(), Language::class,'json');
            $content = $request->toArray();

            $em->persist($language);
            $em->flush();

            $jsonLanguage = $serializer->serialize($language,'json');

            $location = $urlGenerator->generate('detailLanguage', ['id' => $language->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

            return new JsonResponse($jsonLanguage, Response::HTTP_CREATED, ["Location" => $location], true);
        }



    #[Route('/api/language/{id}', name: 'updateLanguage', methods: ['PUT'])]
    #[OA\Put(
        path: "/api/language/{id}",
        summary: "Met à jour une langue existante",
        tags: ["Language"],
        requestBody: new OA\RequestBody(
            description: "Les informations de la langue à mettre à jour",
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: Language::class, groups: ["update"])
            )
        ),
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                description: "L'identifiant de la langue à mettre à jour",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 204,
                description: "Langue mise à jour avec succès",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(property: "name", type: "string"),
                    ]
                )
            ),
            new OA\Response(
                response: 400,
                description: "Erreur de validation"
            ),
            new OA\Response(
                response: 404,
                description: "Langue non trouvé"
            )
        ]
    )]
    #[OA\Tag(name: 'Language')]
        public function updateLanguage(Request $request, SerializerInterface $serializer, Language $currentLanguage, EntityManagerInterface $em): JsonResponse
        {
            $updateLanguage = $serializer->deserialize($request->getContent(), Language::class,'json',[AbstractNormalizer::OBJECT_TO_POPULATE => $currentLanguage]);

            $content = $request->toArray();
            
            $em->persist($updateLanguage);
            $em->flush();

            return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
        }


        #[OA\Response(
            response: 200,
            description: 'Cette méthode permet de supprimer une langue',
            content: new OA\JsonContent(
                type: 'array',
                items: new OA\Items(ref: new Model(type: Language::class, groups: ['getLanguage']))
            )
        )]
        #[OA\Tag(name: 'Language')]
    #[Route('/api/language/{id}', name: 'deleteLanguage', methods: ['DELETE'])]
    public function deleteLAnguage(Language $language, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($language);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}

