<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use Symfony\Contracts\Cache\TagAwareCacheInterface;
use App\Entity\Book;
use App\Entity\Format;
use App\Repository\BookRepository;
use App\Repository\AuthorRepository;
use App\Repository\FormatRepository;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use JMS\Serializer\SerializationContext;
use OpenApi\Attributes as OA;

class FormatController extends AbstractController
{
    // #[Route('/format', name: 'app_format')]
    // public function index(): Response
    // {
    //     return $this->render('format/index.html.twig', [
    //         'controller_name' => 'FormatController',
    //     ]);
    // }
    #[OA\Response(
        response: 200,
        description: 'Cette méthode permet de récupérer les formats',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Format::class))
        )
    )]
    #[OA\Tag(name: 'Format')]
    #[Route('/api/format', name: 'app_format', methods: ['GET'])]
    public function getFormat(FormatRepository $formatRepository, SerializerInterface $serializer, Request $request, TagAwareCacheInterface $cache): JsonResponse
    {
        $format = $formatRepository->findAll();
        $jsonFormat = $serializer->serialize($format, 'json', ['groups' => 'products']);
        return new JsonResponse($jsonFormat, Response::HTTP_OK,[], true);
    }

    #[OA\Response(
        response: 200,
        description: 'Cette méthode permet de récupérer un format',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Format::class))
        )
    )]
    #[OA\Tag(name: 'Format')]
    #[Route('/api/format/{id}', name: 'detailFormat', methods: ['GET'])]
    public function getDetailFormat(SerializerInterface $serializer, Format $format): JsonResponse
    {
            $jsonFormat = $serializer->serialize($format,'json', ['groups' => 'products']);
            return new JsonResponse($jsonFormat, Response::HTTP_OK, ['accept' => 'json'], true);
    }



    #[Route('/api/format', name:'createFormat', methods: ['POST'])]
    #[OA\Post(
        path:"/api/format",
        summary: "Crée un format",
        tags: ["Format"],
        requestBody: new OA\RequestBody(
            description: "Crée un format",
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: Format::class)
            )
        ),
        responses: [
            new OA\Response(
                response: 201,
                description:"Le format a bien été créée",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(property:"name", type:"string"),
                    ])),
                new OA\Response(
                    response: 400,
                    description: "La requête est incorrecte")
        ]
    )]
    #[OA\Tag(name:"Format")]
        public function createFormat(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator): JsonResponse
        {
            $format = $serializer->deserialize($request->getContent(), Format::class,'json');
            $content = $request->toArray();

            $em->persist($format);
            $em->flush();

            $jsonFormat = $serializer->serialize($format,'json', ['groups' => 'products']);

            $location = $urlGenerator->generate('detailFormat', ['id' => $format->getId()], UrlGeneratorInterface::ABSOLUTE_URL);

            return new JsonResponse($jsonFormat, Response::HTTP_CREATED, ["Location" => $location], true);
        }


    
    #[Route('/api/format/{id}', name: 'updateFormat', methods: ['PUT'])]
    #[OA\Put(
        path: "/api/format/{id}",
        summary: "Met à jour d'un format existant",
        tags: ["Format"],
        requestBody: new OA\RequestBody(
            description: "Les informations du format à mettre à jour",
            required: true,
            content: new OA\JsonContent(
                ref: new Model(type: Format::class, groups: ["update"])
            )
        ),
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                description: "L'identifiant du format à mettre à jour",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 204,
                description: "Format mis à jour avec succès",
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
                description: "format non trouvé"
            )
        ]
    )]
    #[OA\Tag(name: 'Format')]
        public function updateFormat(Request $request, SerializerInterface $serializer, Format $currentFormat, EntityManagerInterface $em): JsonResponse
        {
            $updateFormat = $serializer->deserialize($request->getContent(), Format::class,'json',[AbstractNormalizer::OBJECT_TO_POPULATE => $currentFormat]);

            $content = $request->toArray();
            
            $em->persist($updateFormat);
            $em->flush();

            return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
        }

    
        #[OA\Response(
            response: 200,
            description: 'Cette méthode permet de supprimer un format',
            content: new OA\JsonContent(
                type: 'array',
                items: new OA\Items(ref: new Model(type: Format::class)),
            )
        )]
        #[OA\Tag(name: 'Format')]
    #[Route('/api/Format/{id}', name: 'deleteFormat', methods: ['DELETE'])]
    public function deleteFormat(Format $format, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($format);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
